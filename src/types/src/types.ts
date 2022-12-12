export interface User {
  id: number;
  email: string;
  name: string;
  picture?: string | null;
  bio?: string;
  cover_photo?: string;
}

export interface VisitedUser extends User {
  // optional because there is a possibility that the
  // same user will be lookedup which will not have a friendshipStatus
  friendshipStatus?: FriendshipStatus;
}

export interface MiniUser {
  //* returned with any request that returns a user
  id: number;
  name: string;
  picture: string | null;
}

export type FriendshipStatus =
  | "NOT_FRIENDS"
  | "FRIENDS"
  | "PENDING_SENT_BY_YOU"
  | "PENDING_SENT_BY_USER"
  | "REJECTED_BY_USER";

// POST RELATED
export interface Post {
  id: number;
  text: string;
  createdAt: string;

  user: {
    id: number;
    name: string;
    picture: string | null;
    // email?: string;
  };

  likesCount: number;
  commentsCount: number;
  likeId?: number;
}

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  postId: number;
  user: User | VisitedUser | MiniUser;
}

export interface Like {
  id: number;
  user: {
    id: number;
    name: number;
    picture: string | null;
  };
}

export interface Notification {
  createdAt: string;
  fromUser: MiniUser;
  id: number;
  postId?: number;
  read: boolean;
  type:
    | "POST_LIKE"
    | "POST_COMMENT"
    | "FRIEND_REQUEST"
    | "FRIEND_REQUEST_ACCEPTED";
}

export interface FriendRequest {
  id: number;
  createdAt: string;
  sender: MiniUser;
}
