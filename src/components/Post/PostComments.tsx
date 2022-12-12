import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Children, FormEvent, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { createComment, getCommentsByPostId } from "../../client";
import { getAuth } from "../../store/slices/authSlice";
import Button from "../UI/Button/Button";
import useToast from "../../hooks/useToast";
import { Comment, Post } from "../../types";
import { string } from "yup";
import { getRelativeTime } from "../../utils/helpers";
import { Link } from "react-router-dom";
import PostCommentItem from "./PostCommentItem";

interface Props {
  postId: number;
}

const PostComments = ({ postId }: Props) => {
  const [limit, setLimit] = useState(3);
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
          commentsObj.comments
            .sort(
              (a: Comment, b: Comment) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, limit)

            .map((comment: Comment) => (
              <PostCommentItem
                comment={comment}
                postId={postId}
                refetchComments={commentsRefetch}
              />
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
          {/* see more button */}
          {commentsObj && commentsObj.comments.length > limit && (
            <button
              className="text-sm text-gray-500 mt-2 outline-none focus:outline-none hover:underline text-left"
              onClick={() => setLimit((prev) => prev + 3)}
            >
              View more comments
            </button>
          )}
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
