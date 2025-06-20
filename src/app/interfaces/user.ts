export interface User {
  id: number;
  name: string;
  email: string;
  pofileImage?: string;
  isVerified: boolean;
  tokenExpiryDate: string;
}
