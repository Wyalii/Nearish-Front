import { User } from "./user";

export interface FriendRequest {
  id: number;
  sender_Id: number;
  reciver_Id: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string;
  sender: User;
}
