import React, { Children } from "react";
import useFeed from "../../hooks/useFeed";
import InputBox from "../InputBox/InputBox";
import Post from "../Post/Post";
import Container from "../UI/Container/Container";

function Feed() {
  const { feed, loading, error } = useFeed();

  return (
    <div>
      <Container>
        <InputBox />
        <div className="flex flex-col items-center mt-20 ">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {feed && Children.toArray(feed.map((post) => <Post data={post} />))}
        </div>
      </Container>
    </div>
  );
}

export default Feed;
