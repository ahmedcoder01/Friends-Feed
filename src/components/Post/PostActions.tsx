import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineLike } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { likePost, unlikePost } from "../../client";
import useToast from "../../hooks/useToast";
import { getAuth } from "../../store/slices/authSlice";
import { Post } from "../../types";
import PostComments from "./PostComments";
import { MdOutlineModeComment } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

interface Props {
  postId: number;
  likeId: number | undefined;
}

const actionButtonStyles =
  "btn btn-ghost btn-sm flex items-center gap-2 justify-center capitalize flex-1 min-h-5 outline-none focus:outline-none";
const iconProps = { size: "18px" };
//
const PostActions = ({ postId, likeId }: Props): JSX.Element => {
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(likeId ? true : false);

  const { user } = useSelector(getAuth);
  const notify = useToast();

  const likeMutation = useMutation({
    mutationFn: () => {
      return !isLiked ? likePost(postId) : likePost(postId);
    },

    onSuccess: () => {
      setIsLiked((prev) => !prev);
    },
    onError: () => {
      notify("Something went wrong", "error");
    },
  });

  async function addLikeHandler() {
    likeMutation.mutate();
  }

  async function removeLikeHandler() {
    likeMutation.mutate();
  }

  return (
    <div className="card-actions px-3 py-3 min-h-12">
      <hr className="border-1 border-gray-600 w-full" />

      <div className="flex w-full">
        <button
          className={`${actionButtonStyles} ${isLiked ? "text-primary" : ""}`}
          onClick={addLikeHandler}
        >
          {isLiked ? (
            <IoMdHeart {...iconProps} />
          ) : (
            <IoMdHeartEmpty {...iconProps} />
          )}
          <span>Like</span>
        </button>

        <button
          className={`${actionButtonStyles}`}
          onClick={() => setIsCommenting((prev) => !prev)}
        >
          <MdOutlineModeComment {...iconProps} />
          <span>Comment</span>
        </button>
        {/* <button className={`${actionButtonStyles}`}>
          <RiShareForwardLine {...iconProps} />
          <span>Share</span>
        </button> */}
      </div>

      {isCommenting && <hr className="border-1 border-gray-600 w-full" />}

      {isCommenting && <PostComments postId={postId} />}
    </div>
  );
};

export default PostActions;
