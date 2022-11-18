import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuth } from "../../store/slices/authSlice";
import { getRelativeTime } from "../../utils/helpers";
import ProfileWithTimestamp from "../ProfileWithTimestamp/ProfileWithTimestamp";
import PostActions from "./PostInteractions";
import { BsThreeDotsVertical } from "react-icons/bs";
import PostOwnerActions from "./PostOwnerActions";

function Post({ data }) {
  const { user } = useSelector(getAuth);
  const { user: postedUser, text, id, posted_at, image } = data;

  const postOwner = user?.id === postedUser.id;

  return (
    <div className="card shadow-x w-full bg-base-300 mb-12">
      {/* user & post details */}
      <div className="flex justify-between ">
        <ProfileWithTimestamp posted_at={posted_at} user={postedUser} />
        {postOwner && <PostOwnerActions postId={id} />}
      </div>

      <div className="card-body">
        <p>{text}</p>
      </div>
      <figure>{image && <img src={image} alt="post-image" />}</figure>

      {/* post actions */}
      {/* horizontal line */}
      <hr className="border-1 border-gray-300" />
      <PostActions postId={id} />
    </div>
  );
}

export default Post;
