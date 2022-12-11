import {
  CreateCommentRes,
  CreatePostRes,
  FriendRequestsRes,
  NotificationsRes,
  PostCommentsLookupRes,
  PostReq,
  ProfileLookupRes,
  UserPostsLookupRes,
} from "./types/src/api";
import { globalInstance } from "./axios/axiosInstances";
import { Comment, CommentReq, Like, Post } from "./types";

// USER

export const updateProfileImg = (imageFile: File) => {
  return globalInstance.put("users/me/picture", imageFile);
};

// LOOKUP

export const getProfileById = async (
  userId: number
): Promise<ProfileLookupRes> => {
  const req = await globalInstance({
    method: "GET",
    url: `/users/${userId}`,
  });
  return req.data;
};

export const getProfilePosts = async (
  userId: number
): Promise<UserPostsLookupRes> => {
  const req = await globalInstance({
    method: "GET",
    url: `/users/${userId}/posts`,
  });
  return req.data;
};

// FRIENDS

export const addFriend = (userId: number): Promise<void> => {
  return globalInstance.post(`/users/${userId}/friends/add`);
};

// NOTIFICATIONS

export const getNotifications = async (): Promise<NotificationsRes> => {
  const req = await globalInstance({
    method: "GET",
    url: `/notifications`,
  });
  return req.data;
};

// POSTS

export const createPostReq = async (post: PostReq): Promise<CreatePostRes> => {
  const req = await globalInstance({
    method: "POST",
    url: `/posts`,
    data: post,
  });
  return req.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  const req = await globalInstance({
    method: "DELETE",
    url: `/posts/${postId}`,
  });
  return req.data;
};

export const getFeed = async () => {
  // TODO: create feed type
  const req = await globalInstance({
    method: "GET",
    //! change to feed when microservice is ready
    url: `/feeds`,
  });
  return req.data;
};

export const likePost = async (postId: number): Promise<void> => {
  const req = await globalInstance({
    method: "POST",
    url: `/posts/${postId}/like`,
  });
  return req.data;
};

export const unlikePost = async (postId: number, likeId: number) => {
  const req = await globalInstance({
    method: "DELETE",
    url: `/api/v1.0/posts/${postId}/likes/${likeId}`,
  });
  return req.data;
};

export const getCommentsByPostId = async (
  postId: string
): Promise<PostCommentsLookupRes> => {
  const req = await globalInstance({
    method: "GET",
    url: `/posts/${postId}/comments`,
  });
  return req.data;
};

export const createComment = async (
  postId: number,
  comment: CommentReq
): Promise<CreateCommentRes> => {
  const req = await globalInstance({
    method: "POST",
    url: `/posts/${postId}/comments`,
    data: comment,
  });
  return req.data;
};

export const getFriendRequests = async (): Promise<FriendRequestsRes> => {
  const req = await globalInstance({
    method: "GET",
    url: `/friendships/requests`,
  });
  return req.data;
};

export const acceptFriendRequest = async (userId: number): Promise<void> => {
  const req = await globalInstance({
    method: "POST",
    url: `users/${userId}/friendships/accept`,
  });
  return req.data;
};

export const rejectFriendRequest = async (userId: number): Promise<void> => {
  const req = await globalInstance({
    method: "POST",
    url: `/friendships/${userId}/reject`,
  });
  return req.data;
};
