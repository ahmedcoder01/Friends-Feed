import React from "react";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/thunks";

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <>
      <NavBar />

      <Feed />
    </>
  );
};

export default Home;
