import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Children, FormEvent, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { createComment, getCommentsByPostId } from "../../client";
import { getAuth } from "../../store/slices/authSlice";
import Button from "../UI/Button/Button";
import useToast from "../../hooks/useToast";
import { Comment, Post } from "../../types";
import { string } from "yup";
import { getRelativeTime } from "../../utils/helpers";
import { Link } from "react-router-dom";

interface Props {
  postId: number;
}

const defaultAvatar =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const PostComments = ({ postId }: Props) => {
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector(getAuth);
  const notify = useToast();

  // HTTP for displaying comments

  const {
    data: commentsObj,
    error: commentsError,
    isLoading: commentsLoading,
    refetch: commentsRefetch,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: ({ queryKey }) => getCommentsByPostId(queryKey[1] as string),
  });

  const commentMuation = useMutation({
    mutationFn: () => {
      return createComment(postId, { text: commentInputRef.current!.value });
    },
    onSuccess: () => {
      commentInputRef.current && (commentInputRef.current.value = "");
    },
    onError: () => {
      console.log("error");
      console.log(commentMuation.error);
      notify("Something went wrong", "error");
    },
  });

  // event handlers
  async function addCommentHandler(e: FormEvent) {
    e.preventDefault();

    //! maybe no value?
    const commentText = commentInputRef.current!.value;
    await commentMuation.mutateAsync();
    commentsRefetch();
  }

  // comments data formatting
  const hasEmptyComments =
    !commentsLoading && commentsObj && commentsObj.comments.length === 0;

  const emptyCommentsMsg = (
    <div className="flex flex-col items-center">
      <p className="text-md">Be the first to comment</p>
    </div>
  );

  const comments = (
    <ul className="flex flex-col items-center gap-7">
      {commentsObj &&
        Children.toArray(
          commentsObj.comments.map((comment: Comment) => (
            <li className="flex items-center w-full">
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full"
                  src={comment.user.picture || defaultAvatar}
                  alt="avatar"
                />
                <div className="ml-4 flex flex-col">
                  <div className=" flex items-center gap-3">
                    <Link to={`/profile/${comment.user.id}`}>
                      {comment.user.name}
                    </Link>
                    <p className="text-xs text-gray-400">
                      {getRelativeTime(comment.createdAt)}
                    </p>
                  </div>

                  <p className="text-sm text-left text-gray-400">
                    {comment.text}
                  </p>
                </div>
              </div>
            </li>
          ))
        )}
    </ul>
  );

  return (
    <div className="mt-5 w-full text-center">
      {/* comments */}
      <div className="mb-5">
        <>
          {commentsLoading && <p>Loading...</p>}
          {commentsError && <p>Something went wrong</p>}
          {hasEmptyComments && emptyCommentsMsg}
          {!hasEmptyComments && comments}
        </>
      </div>

      {/* comment form */}
      <form
        className="flex sm:items-center sm:flex-row flex-col"
        onSubmit={addCommentHandler}
      >
        <div className="flex flex-grow items-center max-sm:mb-3">
          <img
            className="w-10 h-10 rounded-full"
            src={user?.picture || undefined}
            alt="avatar"
          />
          <input
            type="text"
            className={`input input-bordered ml-3 mr-1 flex-grow ${
              commentMuation.isError ? "input-error" : ""
            }`}
            placeholder="Write a comment..."
            ref={commentInputRef}
          />
        </div>

        <Button type="submit" style="ghost" loading={commentMuation.isLoading}>
          Post
        </Button>
      </form>
    </div>
  );
};

export default PostComments;
