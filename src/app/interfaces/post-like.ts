import { Post } from "./post";
import { User } from "./user";

export interface PostLike {
    id: number;
  userId: number;
  postId: number;
  user?: User;
  post?: Post;
}
