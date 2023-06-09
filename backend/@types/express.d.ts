import { Prisma } from "@prisma/client";
import { IUser } from "../src/types/user";

export {};

//adds type for user prop in the express request object

declare global {
  namespace Express {
    //passport has already added user prop to req object but given user an empty interface of User
    //use the same interface name and TS will merge the two since they are in the same express namespace/scope
    interface User extends Prisma.UserCreateInput { 
      id: string
    }
    //when not using passport, add user prop to request object
    // interface Request {
    //   user: User | undefined;
    // }
  }
}
