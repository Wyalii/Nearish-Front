import { PostComment } from "./post-comment";
import { PostLike } from "./post-like";
import { User } from "./user";

export interface Post {
     id: number;
  userId: number;
  videoUrl?: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
  user?: User;
  likes?: PostLike[];
  comments?: PostComment[];
}
