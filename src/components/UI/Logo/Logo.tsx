import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/app/logo.png";

interface Props {
  size: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ size = "sm", className }: Props): JSX.Element => {
  const sizes = {
    sm: "w-12",
    md: "w-16",
    lg: "w-24",
  };

  return (
    <Link to="/">
      <img src={logo} alt="Friends Feed" className={`${sizes[size]} ml-2`} />
    </Link>
  );
};

export default Logo;
