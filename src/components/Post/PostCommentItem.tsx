import { useMutation } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editComment } from "../../client";
import useToast from "../../hooks/useToast";
import { getAuth } from "../../store/slices/authSlice";
import { Comment } from "../../types";
import { getRelativeTime } from "../../utils/helpers";
import Button from "../UI/Button/Button";

type Props = {
  comment: Comment;
  postId: number;
  refetchComments?: () => void;
};

const defaultAvatar =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const PostCommentItem = ({ comment, postId, refetchComments }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector(getAuth);
  const notify = useToast();
  const commentInputRef = useRef<HTMLInputElement>(null);

  const isSameUser = comment.user.id === user?.id;

  // animation logic
  const wasJustAdded =
    new Date().getTime() - new Date(comment.createdAt).getTime() < 5000;

  //* MUTATIONS
  const commentMuation = useMutation({
    mutationFn: () => {
      return editComment(postId, comment.id, {
        text: commentInputRef.current!.value,
      });
    },
    onSuccess: () => {
      commentInputRef.current && (commentInputRef.current.value = "");
      setIsEditing(false);
      refetchComments && refetchComments();
    },
    onError: () => {
      console.log(commentMuation.error);
      notify("Something went wrong", "error");
    },
  });

  function editCommentHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    commentMuation.mutate();
  }

  let commentUI = (
    <li
      className={`flex items-center w-full justify-between transition hover:bg-base-100 p-1 py-2 rounded-md 
    ${wasJustAdded ? `recently-added` : ""}`}
    >
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={comment.user.picture || defaultAvatar}
          alt="avatar"
        />
        <div className="ml-4 flex flex-col">
          <div className=" flex items-center gap-3">
            <Link to={`/profile/${comment.user.id}`}>{comment.user.name}</Link>
            <p className="text-xs text-gray-400">
              {getRelativeTime(comment.createdAt)}
            </p>
          </div>

          <p className="text-sm text-left text-gray-400">{comment.text}</p>
        </div>
      </div>
      <div>
        {isSameUser && (
          <button
            className="text-xs text-gray-400"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </li>
  );

  let editUI = (
    <li className="flex items-center w-full">
      <form
        onSubmit={editCommentHandler}
        className="w-full flex max-sm:flex-col"
      >
        <div className="flex flex-grow">
          <img
            className="w-6 h-6 rounded-full mr-2 "
            src={comment.user.picture || defaultAvatar}
            alt="avatar"
          />

          <input
            ref={commentInputRef}
            type="text"
            defaultValue={comment.text}
            className="flex-grow rounded-sm px-2 min-h-12"
          />
        </div>
        <div className="flex max-sm:w-full justify-end max-sm:mt-2">
          <button type="submit" className="text-sm">
            Save
          </button>
          <button
            type="button"
            className="text-sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </li>
  );

  return <>{isEditing ? editUI : commentUI}</>;
};

export default PostCommentItem;
