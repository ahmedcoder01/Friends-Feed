import React, { FC } from "react";
import { Link } from "react-router-dom";
import { AnotherUser, User } from "../../types";
import { getRelativeTime } from "../../utils/helpers";

interface Props {
  user: {
    id: number;
    name: string;
    picture: string | null;
    // email?: string;
  };
  timestamp: string;
}

const defaultAvatar =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const ProfileWithTimestamp: FC<Props> = ({ user, timestamp }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={user?.picture || defaultAvatar}
            alt="avatar"
          />
          <div className="ml-3">
            <p className="font-bold text-white">
              {<Link to={`/profile/${user.id}`}>{user.name}</Link>}
            </p>
            <p className="text-sm text-gray-400">
              {getRelativeTime(timestamp)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWithTimestamp;
