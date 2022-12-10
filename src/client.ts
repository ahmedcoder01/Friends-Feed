import { PostReq } from "./types/src/api";
import { globalInstance } from "./axios/axiosInstances";
import { Comment, CommentReq, Like, Post } from "./types";

// USER

export const updateProfileImg = (imageFile: File) => {
  return globalInstance.put("users/me/picture", imageFile);
};

// LOOKUP

export const getProfileById = async (userId: number) => {
  const req = await globalInstance({
    method: "GET",
    url: `/users/${userId}`,
  });
  return req.data;
};

export const getProfilePosts = async (userId: number) => {
  const req = await globalInstance({
    method: "GET",
    url: `/users/${userId}/posts`,
  });
  return req.data;
};

// FRIENDS

export const addFriend = (userId: number) => {
  return globalInstance.post(`/users/${userId}/friends/add`);
};

// NOTIFICATIONS

export const getNotifications = async () => {
  const req = await globalInstance({
    method: "GET",
    url: `/notifications`,
  });
  return req.data;
};

// POSTS

export const createPostReq = async (post: PostReq) => {
  const req = await globalInstance({
    method: "POST",
    url: `/posts`,
    data: post,
  });
  return req.data;
};

export const deletePost = async (postId: number) => {
  const req = await globalInstance({
    method: "DELETE",
    url: `/posts/${postId}`,
  });
  return req.data;
};

export const getFeed = async () => {
  const req = await globalInstance({
    method: "GET",
    //! change to feed when microservice is ready
    url: `/feeds`,
  });
  return req.data;
};

export const likePost = async (postId: number) => {
  const req = await globalInstance({
    method: "POST",
    url: `/posts/${postId}/like`,
  });
  return req.data;
};

export const unlikePost = async (
  postId: Pick<Post, "id">,
  likeId: Pick<Like, "id">
) => {
  const req = await globalInstance({
    method: "DELETE",
    url: `/api/v1.0/posts/${postId}/likes/${likeId}`,
  });
  return req.data;
};

export const getCommentsByPostId = async (postId: string) => {
  const req = await globalInstance({
    method: "GET",
    url: `/posts/${postId}/comments`,
  });
  return req.data;
};

export const createComment = async (postId: number, comment: CommentReq) => {
  const req = await globalInstance({
    method: "POST",
    url: `/posts/${postId}/comments`,
    data: comment,
  });
  return req.data;
};
