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
  name: string | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
};

export type SigninType = {
  identifier: string | undefined;
  password: string | undefined;
};
