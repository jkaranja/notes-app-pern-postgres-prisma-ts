export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  profileUrl?: string;
  newEmail?: string;
}
