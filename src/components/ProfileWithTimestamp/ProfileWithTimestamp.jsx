import React from "react";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../../utils/helpers";

function ProfileWithTimestamp({ user, posted_at }) {
  return (
    <div className="">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={user.photo_url}
            alt="avatar"
          />
          <div className="ml-3">
            <p className="font-bold">
              {<Link to={`/profile/${user.id}`}>{user.name}</Link>}
            </p>
            <p className="text-sm text-gray-400">
              {getRelativeTime(posted_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileWithTimestamp;
