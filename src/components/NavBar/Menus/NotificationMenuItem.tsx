import React from "react";
import { Link } from "react-router-dom";
import { Default } from "react-toastify/dist/utils";
import { Notification } from "../../../types";
import { defaultAvatar } from "../../../utils/helpers";

type Props = {
  notification: Notification;
};

const NotificationMenuItem = ({ notification }: Props) => {
  switch (notification.type) {
    case "POST_LIKE": {
      return (
        <li className="flex px-2 py-3 rounded-lg cursor-pointer hover:bg-gray-700  ">
          <Link
            to={`/posts/${notification.postId}?ref=notification`}
            className="flex gap-4 items-center flex-grow"
          >
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={notification.fromUser.picture || defaultAvatar} />
              </div>
            </div>

            <div>
              <p>
                <span className="font-semibold capitalize">
                  {notification.fromUser.name}
                </span>{" "}
                liked your post
              </p>
            </div>
          </Link>

          {/* indicator */}
          {!notification.read && (
            <div className="indicator">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
          )}
        </li>
      );
    }
    default: {
      return null;
    }
  }
};

export default NotificationMenuItem;
