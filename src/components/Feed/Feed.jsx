import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Children, useState } from "react";
import { createPost, getFeed } from "../../client";
import InputBox from "../InputBox/InputBox";
import Post from "../Post/Post";
import Container from "../UI/Container/Container";
import dummyFeed from "../../mock/feed.json";

function Feed() {
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

  const { mutate, isLoading, isError } = useMutation({
    mutationKey: "createPost",
    mutationFn: (text) => {
      return createPost(text);
    },
  });

  function handleCreatePost(e, text) {
    e.preventDefault();
    console.log(text);

    const isEmpty = text.trim().length === 0;
    if (isEmpty) {
      setValidationErr(true);
      return;
    }
    mutate(text);
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
          {feed && Children.toArray(feed.map((post) => <Post data={post} />))}
        </div>
      </Container>
    </div>
  );
}

export default Feed;
