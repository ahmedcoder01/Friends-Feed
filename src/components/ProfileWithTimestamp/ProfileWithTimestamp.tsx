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

const ProfileWithTimestamp: FC<Props> = ({ user, timestamp }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={user?.picture || undefined}
            alt="avatar"
          />
          <div className="ml-3">
            <p className="font-bold text-primary">
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
