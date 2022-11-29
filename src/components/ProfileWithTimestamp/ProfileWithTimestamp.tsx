import React, { FC } from "react";
import { Link } from "react-router-dom";
import { User } from "../../types";
import { getRelativeTime } from "../../utils/helpers";

interface Props {
  user: User;
  posted_at: string;
}

const ProfileWithTimestamp: FC<Props> = ({ user, posted_at }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={user?.picture}
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
};

export default ProfileWithTimestamp;
