import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { likePost } from "../../client";
import useToast from "../../hooks/useToast";
import { getAuth } from "../../store/slices/authSlice";
import { Post } from "../../types";
import PostComments from "./PostComments";

interface Props {
  postId: number;
}

const PostActions = ({ postId }: Props): JSX.Element => {
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

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
};

export default PostActions;
