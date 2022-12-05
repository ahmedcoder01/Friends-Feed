import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import Container from "../../components/UI/Container/Container";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfileById } from "../../client";
import Loader from "../../components/UI/Loader/Loader";
import useToast from "../../hooks/useToast";
import NavBar from "../../components/NavBar/NavBar";

const Profile = (): JSX.Element => {
  // get id from params
  const { userId: profileUserId } = useParams();
  const notify = useToast();

  const { data: profileResponse, isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile", profileUserId],
    queryFn: ({ queryKey }) => getProfileById(Number(queryKey[1])),
  });

  if (profileLoading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        <ProfileHeader user={profileResponse} />
      </div>
    </>
  );
};

export default Profile;
