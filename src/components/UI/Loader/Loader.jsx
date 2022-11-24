import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

function Loader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Player
        autoplay
        loop
        src="https://assets6.lottiefiles.com/packages/lf20_a2chheio.json"
        style={{ height: "250px", width: "250px" }}
      ></Player>
    </div>
  );
}

export default Loader;
