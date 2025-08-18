import { UserSchemaEntry } from "@/type/user";
import mongoose, { Model, Schema } from "mongoose";

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Employee"],
    default: "Employee",
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const model: Model<UserSchemaEntry> =
  mongoose.models.User || mongoose.model<UserSchemaEntry>("User", schema);
export default model;
