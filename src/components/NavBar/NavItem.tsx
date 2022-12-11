import React, { useState } from "react";

type Props = {
  icon: React.ReactNode;
  children: React.ReactNode;
  title: string;
};

const NavItem = ({ icon, children, title }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className=" sm:relative">
      <button
        className="btn btn-ghost"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {icon}
      </button>
      {open && (
        <div className="absolute top-16 right-0 bg-base-300 sm:w-96 z-50 rounded-lg shadow-lg px-4 py-5 max-sm:w-full">
          <h3 className="mb-7 font-semibold text-lg">{title}</h3>
          {children}
        </div>
      )}
    </li>
  );
};

export default NavItem;
