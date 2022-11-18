import React from "react";

function Button({
  children,
  full,
  type = "button",
  className = "",
  loading = false,
  style = "primary",
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn-active btn-${style} ${loading ? "loading" : ""}  ${
        full ? "btn-wide" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
