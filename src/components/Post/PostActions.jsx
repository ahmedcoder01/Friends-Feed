import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import PostComments from "./PostComments";

function PostActions({ postId }) {
  const [isCommenting, setIsCommenting] = useState(false);

  const { user } = useSelector(getAuth);

  return (
    <div className="card-actions px-3 pb-3">
      <div className="flex justify-around w-full">
        <button className="btn btn-ghost btn-sm">Like</button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setIsCommenting((prev) => !prev)}
        >
          Comment
        </button>
        <button className="btn btn-ghost btn-sm">Share</button>
      </div>

      {isCommenting && <PostComments postId={postId} />}
    </div>
  );
}

export default PostActions;
