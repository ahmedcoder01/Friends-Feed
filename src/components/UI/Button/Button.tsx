import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  full?: boolean;
  className?: string;
  loading?: boolean;
  style?: "primary" | "secondary" | "success" | "error" | "warning" | "ghost";
  [key: string]: any;
}

const Button = ({
  children,
  full = false,
  className = "",
  loading = false,
  style = "primary",
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`btn btn-active btn-${style}  ${loading ? "loading" : ""}  ${
        full ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
