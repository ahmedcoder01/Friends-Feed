import React, { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`container mx-auto  ${className ? className : ""} px-4`}>
      {children}
    </div>
  );
};

export default Container;
