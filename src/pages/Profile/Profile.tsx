import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect, useState, Children } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import Container from "../../components/UI/Container/Container";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import {
  Link,
  Navigate,
  Route,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getProfileById, getProfilePosts } from "../../client";
import Loader from "../../components/UI/Loader/Loader";
import useToast from "../../hooks/useToast";
import NavBar from "../../components/NavBar/NavBar";
import { Post, Tab, VisitedUser } from "../../types";
import PostItem from "../../components/Post/PostItem";
import ProfileBody from "../../components/Profile/ProfileBody";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Routes } from "react-router-dom";
import ProfileFriends from "./tabs/ProfileFriends";
import PostBox from "../../components/PostBox/PostBox";
import ProfileOverview from "./tabs/ProfileOverview";
import useTabs from "../../hooks/useTabs";
import NotFound from "../NotFound/NotFound";

// profile tabs define

const Profile = (): JSX.Element => {
  // get id from params
  const { userId: profileUserId } = useParams();
  const { user } = useSelector(getAuth);
  const notify = useToast();
  //  get the tab selector from search params
  const [searchParams] = useSearchParams();
  const paramsTabSelector = searchParams.get("tab") || "";
  console.log(paramsTabSelector);

  const {
    data: profileResponse,
    isLoading: profileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ["userProfile", profileUserId],
    queryFn: ({ queryKey }) => getProfileById(Number(queryKey[1])),
    staleTime: Infinity,
    // dont refetch
    refetchOnWindowFocus: false,
  });

  // setting up profile tabs
  const profileTabs: Tab[] = [
    {
      label: "Posts",
      selector: "",
      Component: (
        <ProfileOverview profileUser={profileResponse as VisitedUser} />
      ),
    },
    {
      label: "Friends",
      selector: "friends",
      Component: (
        <ProfileFriends profileUser={profileResponse as VisitedUser} />
      ),
    },
  ];

  const tabFromParams = profileTabs.findIndex(
    (tab) => tab.selector === paramsTabSelector
  );
  const { CurrentTab } = useTabs({
    tabs: profileTabs,
    defaultIndex: tabFromParams === -1 ? 0 : tabFromParams,
    notFoundComponent: <NotFound />,
  });

  // RENDERING LOGIC

  // if profile is loading
  if (profileLoading) {
    return <Loader />;
  }

  // if profile is not found
  if (profileError) {
    notify("Profile not found", "error");
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />

        <div className="min-h-screen flex-grow w-100">
          <ProfileHeader user={profileResponse} />

          {/* <ul>
            {Children.toArray(
              profileTabs.map((tab) => (
                <li>
                  <Link to={tab?.selector ? `?tab=${tab.selector}` : ""}>
                    {tab.label}
                  </Link>
                </li>
              ))
            )}
          </ul> */}

          {/* PROFILE TABS */}
          {CurrentTab}
        </div>
      </div>
    </>
  );
};

export default Profile;
