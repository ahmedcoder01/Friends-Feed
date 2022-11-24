import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useHTTP from "../../hooks/useHTTP";
import useToast from "../../hooks/useToast";
import { getAuth } from "../../store/slices/authSlice";
import PostComments from "./PostComments";

function PostActions({ postId }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { user } = useSelector(getAuth);
  const notify = useToast();

  const likeMutation = useMutation({
    mutationFn: () => {
      return likePost(postId);
    },

    onSuccess: () => {
      setIsLiked((prev) => !prev);
    },
    onError: () => {
      notify("Something went wrong", "error");
    },
  });

  async function addLikeHandler() {
    console.log("like");
    // await likePost();
    likeMutation.mutate();
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
