import { Post } from "./post";
import { User } from "./user";

export interface PostComment {
     id: number;
  userId: number;
  postId: number;
  text: string;
  createdAt: string;
  user?: User;
  post?: Post;
}
