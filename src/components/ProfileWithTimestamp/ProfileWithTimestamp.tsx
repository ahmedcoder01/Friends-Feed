import React, { FC } from "react";
import { Link } from "react-router-dom";
import { VisitedUser, User, MiniUser } from "../../types";
import { getRelativeTime } from "../../utils/helpers";
import Timestamp from "../UI/Timestamp";

interface Props {
  user: MiniUser;
  timestamp: string;
}

const defaultAvatar =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const ProfileWithTimestamp: FC<Props> = ({ user, timestamp }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between ">
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
            <Timestamp timestamp={timestamp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWithTimestamp;
