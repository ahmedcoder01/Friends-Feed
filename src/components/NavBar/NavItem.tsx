import React, { useEffect, useRef, useState } from "react";
import { IconBaseProps } from "react-icons/lib";

type Props = {
  Icon: React.ComponentType<IconBaseProps>;
  children?: React.ReactNode;
  hasMenu?: boolean;
  indicator?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const NavItem = ({ Icon, children, hasMenu, indicator, onClick }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  // close the menu when clicking outside of it
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [open]);

  return (
    <li className=" sm:relative" ref={ref}>
      <button
        className="btn btn-ghost"
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          hasMenu && setOpen((prev) => !prev);
          onClick && onClick(e);
        }}
      >
        <div className="indicator">
          {indicator && (
            <span className="indicator-item badge badge-secondary bg-primary"></span>
          )}
          <Icon size="20px" />
        </div>
      </button>
      {open && children}
    </li>
  );
};

export default NavItem;
