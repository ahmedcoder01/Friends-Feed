import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import Container from "../UI/Container/Container";
import { useMutation } from "@tanstack/react-query";
import { VisitedUser } from "../../types";
import { addFriend, updateProfileImg } from "../../client";
import FriendshipStatusBtn from "../FriendshipStatusBtn/FriendshipStatusBtn";

interface ProfileHeaderProps {
  user: VisitedUser;
}

const defaultAvatar =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const ProfileHeader: FC<ProfileHeaderProps> = ({ user: profileUser }) => {
  //TODO: handle friend requests in another component
  const [friendRequestSent, setFriendRequestSent] = useState<boolean>(false);

  const { user } = useSelector(getAuth);
  console.log(profileUser);
  const isSameUser = Number(user?.id) === Number(profileUser?.id);

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
    <Container>
      {/* user header */}
      <div className=" bg-zinc-900 sm:h-72 max-sm:h-40 rounded-b-3xl">
        {profileUser?.cover_photo && (
          <img src={profileUser.cover_photo} alt="cover photo" />
        )}
      </div>
      <div className=" px-10 flex max-sm:justify-center sm:justify-between max-sm:flex-col gap-3">
        {/* user profile image and name */}
        <div className="flex items-center  max-sm:flex-col">
          <div className="rounded-full relative bottom-20 h-24">
            <img
              src={profileUser?.picture || defaultAvatar}
              alt="profile"
              className="rounded-full max-sm:h-40 max-sm:w-40 sm:w-44 sm:h-44 bg-zinc-900 border whitespace-nowrap overflow-hidden"
              style={{ textIndent: "100%" }}
            />
          </div>

          <div className="text-center">
            <h2 className="sm:ml-6 max-sm:mt-2  text-2xl sm:text-3xl ">
              {profileUser?.name}
            </h2>
            <p className="sm:ml-6 text-gray-400 text-sm">{profileUser?.bio}</p>
          </div>
        </div>

        {/*  USER ACTIONS */}
        {!isSameUser && profileUser?.friendshipStatus && (
          <div className="flex items-center max-sm:flex-col">
            <FriendshipStatusBtn
              currentStatus={profileUser.friendshipStatus}
              userId={profileUser.id}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProfileHeader;
