import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

const Loader = (): JSX.Element => {
  return (
    <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 z-50">
      <Player
        autoplay
        loop
        src="https://assets6.lottiefiles.com/packages/lf20_a2chheio.json"
        style={{ height: "250px", width: "250px" }}
      ></Player>
    </div>
  );
};

export default Loader;
