import React from "react";
import { useSelector } from "react-redux";
import uiActions, { getUI } from "../../store/slices/uiSlice";
import Container from "../UI/Container/Container";
import Logo from "../UI/Logo/Logo";
import { AiTwotoneHome, AiOutlineHome, AiOutlineClose } from "react-icons/ai";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5";
import { AiTwotoneMail, AiOutlineMail } from "react-icons/ai";
import { AiTwotoneBell, AiOutlineBell } from "react-icons/ai";
import { FaRegUser, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";

type Props = {};

const Sidebar = (props: Props): JSX.Element => {
  const { sidebarOpen } = useSelector(getUI);
  const dispatch = useAppDispatch();

  const listItems = [
    {
      name: "Home",
      Icon: AiOutlineHome,
      IconActive: AiTwotoneHome,
      path: "/",
    },
    {
      name: "Search",
      Icon: IoSearchOutline,
      IconActive: IoSearchSharp,
      path: "/search",
    },
    {
      name: "Notifications",
      Icon: AiOutlineBell,
      IconActive: AiTwotoneBell,
      path: "/notifications",
    },
    {
      name: "Messages",
      Icon: AiOutlineMail,
      IconActive: AiTwotoneMail,
      path: "/messages",
    },
    {
      name: "Profile",
      Icon: FaRegUser,
      IconActive: FaUserAlt,
      path: "/profile",
    },
  ];

  return (
    <aside
      className={`md:w-72 max-md:w-24 h-screen relative ${
        sidebarOpen ? "" : "max-sm:hidden"
      }`}
    >
      <div className="fixed sm:top-16 max-sm:top-0 left-0 px-4 py-7  h-screen max-sm:w-screen z-40 max-sm:bg-black">
        <div className="max-sm:flex sm:hidden w-full justify-end">
          <button
            className="btn btn-ghost"
            onClick={() => dispatch(uiActions.toggleSidebar())}
          >
            {/* close btn */}
            <AiOutlineClose size="21px" />
          </button>
        </div>
        <Logo size="sm" />

        <ul className=" mt-5 flex flex-col gap-3 ">
          {listItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={(isActive) =>
                  isActive ? "text-blue-500" : "text-gray-500"
                }
              >
                {({ isActive }) => {
                  return isActive ? (
                    <div className="flex items-center gap-4 btn btn-ghost justify-start ">
                      {<item.IconActive size="26px" />}
                      <span className="text-blue-500 sm:max-md:hidden text-xl capitalize">
                        {item.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 btn btn-ghost justify-start">
                      {<item.Icon size="26px" />}
                      <span className="text-gray-500 sm:max-md:hidden text-xl capitalize">
                        {item.name}
                      </span>
                    </div>
                  );
                }}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
