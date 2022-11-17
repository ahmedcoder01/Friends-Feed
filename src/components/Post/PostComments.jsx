import React, { Children, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useHTTP from "../../hooks/useHTTP";
import { getAuth } from "../../store/slices/authSlice";
import ProfileWithTimestamp from "../ProfileWithTimestamp/ProfileWithTimestamp";
import Button from "../UI/Button/Button";

function PostComments({ postId }) {
  const commentInputRef = useRef();
  const { user } = useSelector(getAuth);

  // HTTP for displaying comments
  const {
    response: commentsObj,
    error,
    loading,
    fetchData: fetchComments,
  } = useHTTP({
    path: `/posts/${postId}/comments`,
    method: "GET",
  });

  // HTTP adding comment
  const {
    response: commentResponse,
    error: addingCommentError,
    loading: addingCommentLoading,
    fetchData: addComment,
    setError: setCommentAddingError,
  } = useHTTP({
    path: `/posts/${postId}/comments`,
    method: "POST",
  });

  useEffect(() => {
    fetchComments();
  }, []);

  // event handlers
  async function addCommentHandler(e) {
    console.log("add comment handler");
    e.preventDefault();
    const commentText = commentInputRef.current.value;
    console.log(commentText);

    if (commentText.length === 0) {
      setCommentAddingError("Comment cannot be empty");
      return;
    }
    await addComment({ text: commentText });

    if (addingCommentError) {
      setCommentAddingError("Cannot add comment at this time");
      return;
    }

    e.target.reset();
  }

  // comments data formatting
  const hasEmptyComments =
    !loading && commentsObj && commentsObj.comments.length === 0;

  const emptyCommentsMsg = (
    <div className="flex flex-col items-center">
      <p className="text-md">Be the first to comment</p>
    </div>
  );

  const comments = (
    <div className="flex flex-col items-center">
      {commentsObj &&
        Children.toArray(
          commentsObj.comments.map((comment) => (
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
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {hasEmptyComments ? emptyCommentsMsg : comments}
      </div>

      {/* comment form */}
      <form className="flex items-center" onSubmit={addCommentHandler}>
        <img
          className="w-10 h-10 rounded-full"
          src={user.picture}
          alt="avatar"
        />
        <input
          type="text"
          className={`input input-bordered ml-3 flex-grow ${
            addingCommentError ? "input-error" : ""
          }`}
          placeholder="Write a comment..."
          ref={commentInputRef}
        />

        <Button type="submit" loading={addingCommentLoading}>
          Post
        </Button>
      </form>

      {addingCommentError && (
        <p className="text-red-500 text-sm mt-3">{addingCommentError}</p>
      )}
    </div>
  );
}

export default PostComments;
