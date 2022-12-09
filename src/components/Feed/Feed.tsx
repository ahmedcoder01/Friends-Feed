import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Children, FC, FormEvent, useState } from "react";
import { createPostReq, getFeed } from "../../client";
import InputBox from "../InputBox/InputBox";
import PostItem from "../Post/PostItem";
import Container from "../UI/Container/Container";
import dummyFeed from "../../mock/feed.json";
import { Post, PostReq } from "../../types";

const Feed: FC = () => {
  const [validationErr, setValidationErr] = useState<boolean>(false);

  // FEED POSTS
  const {
    data: feed,
    isLoading: isFeedLoading,
    isError: isFeedError,
  } = useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
    retry: false,
    //TODO: refresh every 4 mins (staleTime)
    staleTime: Infinity,
  });

  // CREATE POST
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

  function handleCreatePost(e: FormEvent, text: string) {
    e.preventDefault();

    const isEmpty = text.trim().length === 0;
    if (isEmpty) {
      setValidationErr(true);
      return;
    }
    createPost({ text });
  }

  return (
    <div className="flex items-center flex-grow justify-center">
      <div className="max-w-2xl">
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
            {/* {!feed && isFeedError && <p>Something went wrong</p>} */}
            {/* //! remove dummy data once the microservice runs */}
            {/* {feed &&
            Children.toArray(
              feed.map((post: Post) => <PostItem data={post} />)
            )} */}
            {dummyFeed &&
              Children.toArray(
                dummyFeed.map((post: any) => <PostItem data={post} />)
              )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Feed;
