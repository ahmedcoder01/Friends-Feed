import { Post, Comment, MiniUser } from "./types";
//* REQUESTS

// AUTH

export interface LoginReq {
  email: string;
  password: string;
}

export interface SignupReq {
  email: string;
  bio?: string;
  name: string;
  password: string;
}

// POST RELATED DTO
export interface PostReq {
  text: string;
}

export interface CommentReq {
  text: string;
}

//* RESPONSES

//

export interface ProfileLookupRes {
  id: number;
  name: string;
  email: string;
  picture?: string;
  bio?: string;
  friendshipStatus?:
    | "NOT_FRIENDS"
    | "FRIENDS"
    | "PENDING_SENT_BY_YOU"
    | "PENDING_SENT_BY_USER"
    | "REJECTED_BY_USER";
}

export interface UserPostsLookupRes {
  posts: Post[];
  count: number;
  page: number;
  limit: number;
}

export interface PostCommentsLookupRes {
  comments: Comment[];
  count: number;
  page: number;
  limit: number;
}

export interface NotificationsRes {
  //! TODO: create notification type
  notifications: Array<any>;
  count: number;
  limit: number;
  page: number;
}

export interface CreatePostRes {
  id: number;
  user: MiniUser;
  text: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  likeId: number;
}

export interface CreateCommentRes {
  id: number;
  text: string;
  createdAt: string;
  user: MiniUser;
  postId: number;
}

export interface FriendRequestsRes {
  requests: [
    {
      id: number;
      createdAt: string;
      sender: MiniUser;
    }
  ];
  count: number;
  page: number;
  limit: number;
}
