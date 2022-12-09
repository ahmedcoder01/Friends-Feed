import React, { FC } from "react";
import SearchButton from "../Search/SearchButton";
import NotificationsButton from "../Notifications/NotificationsButton";
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

const NavBar: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(getAuth);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <button
          className="max-sm:block sm:hidden btn btn-ghost"
          onClick={() => {
            dispatch(uiActions.toggleSidebar());
          }}
        >
          {/* menu burger */}
          <AiOutlineMenu size="20px" />
        </button>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Friends Feed</a>
      </div>
      <div className="navbar-end">
        <SearchButton />
        {/* notifications */}
        <NotificationsButton />
      </div>
    </nav>
  );
};

export default NavBar;
