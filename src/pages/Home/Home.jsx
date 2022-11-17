import React from "react";
import { useDispatch } from "react-redux";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";
import { logout } from "../../store/thunks";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <>
      <NavBar />

      <Feed />
    </>
  );
};

export default Home;
