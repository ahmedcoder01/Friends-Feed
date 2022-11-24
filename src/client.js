import { globalInstance } from "./axios/axiosInstances";

// PROFILES

export const getProfileById = async (userId) => {
    const req = await globalInstance({
        method: "GET",
        url: `/users/${userId}`,
    });
    return req.data;
}

// NOTIFICATIONS

export const getNotifications = async () => {
    const req = await globalInstance({
        method: "GET",
        url: `/notifications`,
    });
    return req.data;
}

// POSTS

export const createPost = async (post) => {
    const req = await globalInstance({
        method: "POST",
        url: `/posts`,
        data: { text: post },
    });
    return req.data;
}

export const getFeed = async () => {
    const req = await globalInstance({
        method: "GET",
        url: `/posts`,
    });
    return req.data;
}

export const likePost = async (postId) => {
    const req = await globalInstance({
        method: "POST",
        url: `/posts/${postId}/like`,
    });
    return req.data;
}

export const unlikePost = async (postId, likeId) => {
    const req = await globalInstance({
        method: "DELETE",
        url: `/api/v1.0/posts/${postId}/likes/${likeId}`,
    });
    return req.data;
}

export const getCommentsByPostId = async (postId) => {
    const req = await globalInstance({
        method: "GET",
        url: `/posts/${postId}/comments`,
    });
    return req.data;
}

export const createComment = async (postId, comment) => {
    const req = await globalInstance({
        method: "POST",
        url: `/posts/${postId}/comments`,
        data: { text: comment },
    });
    return req.data;
}