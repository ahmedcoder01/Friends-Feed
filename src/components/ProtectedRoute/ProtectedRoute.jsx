import React from "react";
import { getAuth } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { hasValidToken, authLoading } = useSelector(getAuth);

  if (hasValidToken) {
    return children;
  }

  if (authLoading && !hasValidToken) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="">Loading...</div>
      </div>
    );
  }

  if (!authLoading && !hasValidToken) {
    return <Navigate to="/login" state={false} />;
  }
}

export default ProtectedRoute;
