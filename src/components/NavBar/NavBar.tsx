import React, { FC, useState } from "react";
import SearchButton from "../Search/SearchButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../store/thunks";
import { getAuth } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/hooks";
import PATHS from "../../routes";
import Sidebar from "../Sidebar/Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import { getUI } from "../../store/slices/uiSlice";
import uiActions from "../../store/slices/uiSlice";
import { HiOutlineUsers } from "react-icons/hi";
import NavItem from "./NavItem";
import NavMenu from "./NavItemMenu";
import NavItemMenu from "./NavItemMenu";
import FriendRequestsMenu from "./Menus/FriendRequestsMenu";
import { IoNotificationsOutline } from "react-icons/io5";
import NotificationsMenu from "./Menus/NotificationsMenu";
import appActions, { getAppSlice } from "../../store/slices/appSlice";

const NavBar: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(getAuth);
  const { hasUnreadNotifications } = useSelector(getAppSlice);

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <button
          className="max-md:block md:hidden btn btn-ghost"
          onClick={() => {
            dispatch(uiActions.toggleSidebar());
          }}
        >
          {/* menu burger */}
          <AiOutlineMenu size="20px" />
        </button>
      </div>
      <div className="navbar-center">
        <Link
          to={PATHS.home.root}
          className="btn btn-ghost normal-case text-xl"
        >
          Friends Feed
        </Link>
      </div>
      <ul className="navbar-end">
        <SearchButton />

        {/* notifications */}
        <NavItem Icon={IoNotificationsOutline} hasMenu={true}>
          <NavItemMenu title="Notifications">
            <NotificationsMenu />
          </NavItemMenu>
        </NavItem>
        {/* user menu */}

        {/* friend requests */}
        <NavItem
          Icon={HiOutlineUsers}
          hasMenu={true}
          indicator={hasUnreadNotifications}
          onClick={() => {
            dispatch(appActions.haveRead());
          }}
        >
          <NavItemMenu title="Friends Requests">
            <FriendRequestsMenu />
          </NavItemMenu>
        </NavItem>
      </ul>
    </nav>
  );
};

export default NavBar;
