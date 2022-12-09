import React from "react";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/thunks";

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className="sm:flex">
      <Sidebar />
      <div className="flex-grow">
        <NavBar />

        <Feed />
      </div>
    </div>
  );
};

export default Home;
