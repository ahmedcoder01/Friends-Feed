export interface User {
  id: number;
  email: string;
  name: string;
  picture: string | null;
  bio: string;
}

// POST RELATED
export interface Post {
  id: number;
  text: string;
  createdAt: string;

  user: {
    id: number;
    name: string;
    picture: string | null;
    email: string;
  };

  likesCount: number;
  commentsCount: number;
}

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  postId: number;
  user: {
    id: number;
    name: string;
    picture: string | null;
  };
}

export interface Like {
  id: number;
  user: {
    id: number;
    name: number;
    picture: string | null;
  };
}
