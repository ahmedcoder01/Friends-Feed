import React from "react";
import SearchButton from "../Search/SearchButton";
import NotificationsButton from "../Notifications/NotificationsButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/thunks";
import { getAuth } from "../../store/slices/authSlice";

function NavBar() {
  const dispatch = useDispatch();
  const { user } = useSelector(getAuth);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to={`/profile/${user?.id}`}>Profile</Link>
            </li>
            <li>
              <Link to="/friends">Friends</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
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
}

export default NavBar;
