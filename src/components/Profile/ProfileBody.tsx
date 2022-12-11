import { useQuery } from "@tanstack/react-query";
import React, { Children } from "react";
import { useSelector } from "react-redux";
import { getProfilePosts } from "../../client";
import { getAuth } from "../../store/slices/authSlice";
import { VisitedUser, Post, User } from "../../types";
import PostItem from "../Post/PostItem";
import PostBox from "../PostBox/PostBox";
import Container from "../UI/Container/Container";

type Props = {
  profileUser: VisitedUser;
};

const ProfileBody = ({ profileUser }: Props) => {
  const { user } = useSelector(getAuth);
  const profileUserId = profileUser?.id;

  const {
    data: pPostsRes,
    refetch: refetchProfilePosts,
    isLoading: pPostsLoading,
    error: pPostsError,
  } = useQuery({
    queryKey: ["profilePosts", profileUserId],
    queryFn: ({ queryKey }) => getProfilePosts(Number(queryKey[1])),
    staleTime: Infinity,
  });

  const isSameUser = user?.id === Number(profileUserId);
  console.log(isSameUser);

  return (
    <div>
      <Container className=" max-sm:py-20 sm:py-32 flex max-w-2xl justify-center flex-col">
        {isSameUser && (
          <PostBox
            wrapperStyles="w-full"
            onSuccess={() => {
              refetchProfilePosts();
            }}
          />
        )}

        {pPostsRes?.posts.length !== 0 && (
          <h3 className="text-2xl font-bold mb-4 text-left mt-7">
            {isSameUser ? "Your" : `${profileUser?.name}'s`} Posts
          </h3>
        )}

        <ul className="  flex-grow w-full">
          {Children.toArray(
            pPostsRes?.posts?.map((post: Post) => <PostItem data={post} />)
          )}
        </ul>
      </Container>
    </div>
  );
};

export default ProfileBody;
