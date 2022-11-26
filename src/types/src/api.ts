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
