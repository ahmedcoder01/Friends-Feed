import React from "react";

function Container({ children, className }) {
  return (
    <div className={`container mx-auto  ${className ? className : ""} px-2`}>
      {children}
    </div>
  );
}

export default Container;
