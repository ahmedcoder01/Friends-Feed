import React, { FC } from "react";
import { getAuth } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../UI/Loader/Loader";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { hasValidToken, authLoading } = useSelector(getAuth);

  if (authLoading) {
    return <Loader />;
  }

  if (!authLoading && !hasValidToken) {
    return <Navigate to="/login" state={false} />;
  }

  return children;
};

export default ProtectedRoute;
