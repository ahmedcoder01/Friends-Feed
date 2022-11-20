import React, { useState } from "react";
import { useSelector } from "react-redux";
import useHTTP from "../../hooks/useHTTP";
import { getAuth } from "../../store/slices/authSlice";
import Container from "../UI/Container/Container";
import { useParams } from "react-router-dom";

function ProfileHeader({ profileUserId, profileUser }) {
  //TODO: handle friend requests in another component
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  const { user } = useSelector(getAuth);
  const isSameUser = Number(user?.id) === Number(profileUserId);
  // check if they are friends

  //* REQUESTS
  // add profile picture
  const {
    error: profileImgError,
    loading: profileImgLoading,
    fetchData: updateProfileImg,
  } = useHTTP({
    path: "/users/me/picture",
    method: "PUT",
  });
  // add friend request
  const {
    response: addFriendResponse,
    error: addFriendError,
    loading: addFriendLoading,
    fetchData: addFriend,
  } = useHTTP({
    path: `/users/${profileUserId}/friends/add`,
    method: "POST",
  });

  async function changeProfilePicHandler(e) {
    const file = e.target.files[0];
    await updateProfileImg(file);
  }

  async function addFriendHandler() {
    await addFriend();
    console.log(addFriendResponse);
  }

  return (
    <>
      {/* user header */}
      <div className=" bg-zinc-900 h-80">
        {profileUser?.cover_photo && (
          <img src={cover_photo} alt="cover photo" />
        )}
      </div>
      <Container>
        <div className=" flex justify-between">
          {/* user profile image and name */}
          <div className="flex items-center  max-sm:flex-col">
            <div className="rounded-full relative bottom-20 h-24">
              <img
                src={profileUser?.picture}
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
                  addFriendLoading && "loading"
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
}

export default ProfileHeader;
