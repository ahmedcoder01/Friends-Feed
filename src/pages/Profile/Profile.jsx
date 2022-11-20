import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import Container from "../../components/UI/Container/Container";
import useHTTP from "../../hooks/useHTTP";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { useParams } from "react-router-dom";

function Profile() {
  // get id from params
  const { userId: profileUserId } = useParams();

  const {
    response: profileResponse,
    error: profileError,
    loading: profileLoading,
    fetchData: getProfile,
  } = useHTTP({
    path: `/users/${profileUserId}`,
    method: "GET",
  });

  useEffect(() => {
    async function fetch() {
      await getProfile();
    }
    fetch();
  }, []);

  return (
    <div className="min-h-screen">
      <ProfileHeader
        profileUserId={profileUserId}
        profileUser={profileResponse}
      />
    </div>
  );
}

export default Profile;
