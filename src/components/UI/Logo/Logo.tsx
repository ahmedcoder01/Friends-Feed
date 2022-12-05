import React from "react";
import logo from "../../../assets/images/app/logo.png";

interface Props {
  size: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ size = "sm", className }: Props): JSX.Element => {
  const sizes = {
    sm: "w-16",
    md: "w-24",
    lg: "w-44",
  };

  return <img src={logo} alt="Friends Feed" className={sizes[size]} />;
};

export default Logo;
