import React from "react";
import { getAuth } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

function ProtectedRoute({ children }) {
  const { hasValidToken, authLoading } = useSelector(getAuth);

  if (hasValidToken) {
    return children;
  }

  if (authLoading && !hasValidToken) {
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

  if (!authLoading && !hasValidToken) {
    return <Navigate to="/login" state={false} />;
  }
}

export default ProtectedRoute;
