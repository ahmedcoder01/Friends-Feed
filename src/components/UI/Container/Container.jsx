import React from "react";

function Container({ children, className }) {
  return (
    <div className={`container mx-auto  ${className ? className : ""} px-4`}>
      {children}
    </div>
  );
}

export default Container;
