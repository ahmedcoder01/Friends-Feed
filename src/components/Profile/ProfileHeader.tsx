import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import Container from "../UI/Container/Container";
import { useMutation } from "@tanstack/react-query";
import { AnotherUser } from "../../types";
import { addFriend, updateProfileImg } from "../../client";

interface ProfileHeaderProps {
  user: AnotherUser;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ user: profileUser }) => {
  //TODO: handle friend requests in another component
  const [friendRequestSent, setFriendRequestSent] = useState<boolean>(false);

  const { user } = useSelector(getAuth);
  console.log(profileUser);
  const isSameUser = Number(user?.id) === Number(profileUser?.id);
  console.log(profileUser);

  // check if they are friends

  //* REQUESTS
  // add profile picture

  const updatePpMutation = useMutation({
    mutationKey: ["updateProfileImg"],
    mutationFn: (file: File) => {
      return updateProfileImg(file);
    },
  });

  // add friend request
  const sendFriendReqMutation = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: (userId: number) => {
      return addFriend(userId);
    },
  });

  // HANDLERS

  async function changeProfilePicHandler(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    updatePpMutation.mutate(file);
  }

  async function addFriendHandler() {
    sendFriendReqMutation.mutate(profileUser.id);
  }

  return (
    <>
      {/* user header */}
      <div className=" bg-zinc-900 h-72">
        {profileUser?.cover_photo && (
          <img src={profileUser.cover_photo} alt="cover photo" />
        )}
      </div>
      <Container>
        <div className=" flex max-sm:justify-center sm:justify-between">
          {/* user profile image and name */}
          <div className="flex items-center  max-sm:flex-col">
            <div className="rounded-full relative bottom-20 h-24">
              <img
                src={profileUser?.picture || undefined}
                alt="profile"
                className="rounded-full h-44 w-44 bg-zinc-900 border whitespace-nowrap overflow-hidden"
                style={{ textIndent: "100%" }}
              />
            </div>

            <div>
              <h2 className="sm:ml-6 max-sm:mt-2  text-2xl sm:text-3xl ">
                {profileUser?.name}
              </h2>
              <p className="sm:ml-6 text-gray-400 text-sm">
                {profileUser?.bio}
              </p>
            </div>
          </div>

          {/* user actions */}
          {!isSameUser && profileUser && (
            <div className="flex items-center max-sm:flex-col">
              <button
                className={`btn btn-primary max-sm:mt-2 ${
                  sendFriendReqMutation.isLoading && "loading"
                }`}
                onClick={addFriendHandler}
              >
                Add Friend
              </button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProfileHeader;
