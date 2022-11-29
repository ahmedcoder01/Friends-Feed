import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  full?: boolean;
  className?: string;
  loading?: boolean;
  style?: "primary" | "secondary" | "success" | "error" | "warning";
}

function Button({
  children,
  full = "false",
  type = "button",
  className = "",
  loading = false,
  style = "primary",
  ...props
}) {
  return (
    <button
      className={`btn btn-active btn-${style} ${loading ? "loading" : ""}  ${
        full ? "btn-wide" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
