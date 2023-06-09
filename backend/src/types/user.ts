export interface IUser {
  id?: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  profileUrl: string | null; //image url on cloud nary
  roles: string[]; //with array, you can do user.roles.push('')
  newEmail: string | null;
  isVerified: boolean;
  verifyEmailToken: string | null;
  resetPasswordToken: string | null;
  resetPasswordTokenExpiresAt: Date | null;
}


