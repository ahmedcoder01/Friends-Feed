import React from "react";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../../utils/helpers";
import ProfileWithTimestamp from "../ProfileWithTimestamp/ProfileWithTimestamp";
import PostActions from "./PostActions";

function Post(data) {
  const { user, text, id, posted_at, image } = data.data;

  return (
    <div className="card shadow-x w-full bg-base-300 mb-4">
      {/* user & post details */}
      <ProfileWithTimestamp posted_at={posted_at} user={user} />

      <div className="card-body">
        <p>{text}</p>
      </div>
      <figure>{image && <img src={image} alt="post-image" />}</figure>

      {/* post actions */}
      <PostActions postId={id} />
    </div>
  );
}

export default Post;
