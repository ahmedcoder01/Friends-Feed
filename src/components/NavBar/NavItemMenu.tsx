import React, { useRef, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

const NavItemMenu = ({ children, title }: Props) => {
  return (
    <div className="absolute top-16 right-0 bg-base-200 sm:w-96 z-50 rounded-md shadow-lg px-4 py-5 max-sm:w-full">
      <h3 className="mb-7 font-semibold text-2xl">{title}</h3>
      {children}
    </div>
  );
};

export default NavItemMenu;
