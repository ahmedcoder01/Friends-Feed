import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Children, FC, useState } from "react";
import { createPostReq, getFeed } from "../../client";
import InputBox from "../InputBox/InputBox";
import PostItem from "../Post/PostItem";
import Container from "../UI/Container/Container";
import dummyFeed from "../../mock/feed.json";
import { Post, PostReq } from "../../types";

const Feed: FC = () => {
  const [validationErr, setValidationErr] = useState(null);

  const {
    data: feed,
    isLoading: isFeedLoading,
    isError: isFeedError,
  } = useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
    retry: 1,
    //! remove dummy data once the microservice runs
    initialData: dummyFeed,
  });

  const {
    mutate: createPost,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (data: PostReq) => {
      return createPostReq(data);
    },
  });

  function handleCreatePost(e: SubmitEvent, text: string) {
    e.preventDefault();
    console.log(text);

    const isEmpty = text.trim().length === 0;
    if (isEmpty) {
      setValidationErr(true);
      return;
    }
    createPost({ text });
  }

  return (
    <div>
      <Container>
        <InputBox
          onSubmit={handleCreatePost}
          onChange={() => setValidationErr(false)}
          isLoading={isLoading}
          isError={isError}
          isValidationError={validationErr}
        />
        <div className="flex flex-col items-center mt-20 ">
          {isFeedLoading && <p>Loading...</p>}
          {!feed && isFeedError && <p>Something went wrong</p>}
          {feed &&
            Children.toArray(
              feed.map((post: Post) => <PostItem data={post} />)
            )}
        </div>
      </Container>
    </div>
  );
};

export default Feed;
