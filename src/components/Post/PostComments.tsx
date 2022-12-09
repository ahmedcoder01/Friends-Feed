import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Children, FormEvent, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { createComment, getCommentsByPostId } from "../../client";
import { getAuth } from "../../store/slices/authSlice";
import ProfileWithTimestamp from "../ProfileWithTimestamp/ProfileWithTimestamp";
import Button from "../UI/Button/Button";
import useToast from "../../hooks/useToast";
import { Comment, Post } from "../../types";
import { string } from "yup";

interface Props {
  postId: Pick<Post, "id">;
}

const PostComments = ({ postId }: Props) => {
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector(getAuth);
  const notify = useToast();

  // HTTP for displaying comments

  const {
    data: commentsObj,
    error: commentsError,
    isLoading: commentsLoading,
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
    console.log("add comment handler");
    e.preventDefault();

    //! maybe no value?
    const commentText = commentInputRef.current!.value;
    commentMuation.mutate();
    console.log(commentText);
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
    <div className="flex flex-col items-center">
      {commentsObj &&
        Children.toArray(
          commentsObj.comments.map((comment: Comment) => (
            <div className="flex flex-col items-center ">
              <ProfileWithTimestamp
                user={comment.user}
                timestamp={comment.createdAt}
              />
              <p className="text-md font-semibold">{comment.text}</p>
              <p className="text-md font-semibold">{comment.user.name}</p>
            </div>
          ))
        )}
    </div>
  );

  return (
    <div className="mt-5 w-full text-center">
      {/* comments */}
      <div className="mb-5">
        {commentsLoading && <p>Loading...</p>}
        {commentsError && <p>Something went wrong</p>}
        {hasEmptyComments && emptyCommentsMsg}
        {!hasEmptyComments && comments}
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
