import { useQuery } from "@tanstack/react-query";
import React, { Children } from "react";
import { getProfilePosts } from "../../client";
import { AnotherUser, Post, User } from "../../types";
import PostItem from "../Post/PostItem";
import PostBox from "../PostBox/PostBox";
import Container from "../UI/Container/Container";

type Props = {
  user: AnotherUser;
};

const ProfileBody = ({ user }: Props) => {
  const profileUserId = user?.id;

  const {
    data: profilePostsResponse,
    refetch: refetchProfilePosts,
    isLoading: profilePostsLoading,
    error: profilePostsError,
  } = useQuery({
    queryKey: ["profilePosts", profileUserId],
    queryFn: ({ queryKey }) => getProfilePosts(Number(queryKey[1])),
    staleTime: Infinity,
  });

  const isSameUser = user?.id === Number(profileUserId);

  return (
    <div>
      <Container className=" py-32 flex max-w-2xl justify-center flex-col">
        <PostBox
          wrapperStyles="w-full"
          onSuccess={() => {
            refetchProfilePosts();
          }}
        />

        <h3 className="text-2xl font-bold mb-4 text-left mt-7">
          {isSameUser ? "Your" : `${user?.name}'s`} Posts
        </h3>
        <ul className="  flex-grow w-full">
          {Children.toArray(
            profilePostsResponse?.posts?.map((post: Post) => (
              <PostItem data={post} />
            ))
          )}
        </ul>
      </Container>
    </div>
  );
};

export default ProfileBody;
