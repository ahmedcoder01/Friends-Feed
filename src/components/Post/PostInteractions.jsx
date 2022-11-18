import React, { useState } from "react";
import { useSelector } from "react-redux";
import useHTTP from "../../hooks/useHTTP";
import { getAuth } from "../../store/slices/authSlice";
import PostComments from "./PostComments";

function PostActions({ postId }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { user } = useSelector(getAuth);

  const {
    response: likeResponse,
    error: likeError,
    loading: likeLoading,
    fetchData: likePost,
  } = useHTTP({
    path: `/posts/${postId}/likes`,
    method: isLiked ? "DELETE" : "POST",
  });

  async function addLikeHandler() {
    console.log("like");
    await likePost();
    if (likeError) return;

    setIsLiked((prevState) => !prevState);
  }

  return (
    <div className="card-actions px-3 py-3">
      <div className="flex justify-around w-full">
        <button
          className={`btn btn-ghost btn-sm ${isLiked ? "text-primary" : ""}`}
          onClick={addLikeHandler}
        >
          {isLiked ? "Liked" : "Like"}
        </button>

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
