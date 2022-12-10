import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect, useState, Children } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import Container from "../../components/UI/Container/Container";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { Link, Navigate, Route, useParams } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getProfileById, getProfilePosts } from "../../client";
import Loader from "../../components/UI/Loader/Loader";
import useToast from "../../hooks/useToast";
import NavBar from "../../components/NavBar/NavBar";
import { Post } from "../../types";
import PostItem from "../../components/Post/PostItem";
import ProfileBody from "../../components/Profile/ProfileBody";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Routes } from "react-router-dom";
import ProfileFriends from "./tabs/ProfileFriends";
import PostBox from "../../components/PostBox/PostBox";

const Profile = (): JSX.Element => {
  // get id from params
  const { userId: profileUserId } = useParams();
  const { user } = useSelector(getAuth);
  const notify = useToast();

  const {
    data: profileResponse,
    isLoading: profileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ["userProfile", profileUserId],
    queryFn: ({ queryKey }) => getProfileById(Number(queryKey[1])),
    staleTime: Infinity,
  });

  if (profileLoading) {
    return <Loader />;
  }

  if (profileError) {
    notify("Profile not found", "error");
  }

  const overview = (
    <>
      <ProfileBody user={profileResponse} />
    </>
  );

  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />

        <div className="min-h-screen flex-grow w-100">
          <ProfileHeader user={profileResponse} />

          {/* PROFILE TABS */}
          <Routes>
            <Route path="/" element={overview} />
            {/* user profile routes */}
            <Route
              path="friends"
              element={<ProfileFriends user={profileResponse} />}
            />

            {/* <Route path="*" element={<Navigate to="" />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Profile;
