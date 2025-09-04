import { Document } from "mongoose";

type RoleType = "Admin" | "Employee";

export interface UserSchemaEntry extends Document {
  name: string;
  username: string;
  email: string;
  role: RoleType;
  password: string;
}

export type SignupType = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SigninType = {
  identifier: string | undefined;
  password: string | undefined;
};
