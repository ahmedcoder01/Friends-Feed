import React from "react";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import withSuspense from "../../HOC/withSuspense";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/thunks";

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className="">
      <NavBar />

      <div className="flex">
        <Sidebar />

        <Feed />
      </div>
    </div>
  );
};

export default withSuspense(Home);
