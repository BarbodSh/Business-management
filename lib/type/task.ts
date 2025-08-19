import mongoose, { Document } from "mongoose";

type PriorityTaskType = "Low" | "Medium" | "High";
type StatusTaskType = "PENDING" | "IN_PROGRESS" | "DONE";

export interface TaskSchemaEntry extends Document {
  title: string;
  description: string;
  creator: mongoose.Types.ObjectId;
  assignee: mongoose.Types.ObjectId;
  status: StatusTaskType;
  priority: PriorityTaskType;
  dueDate: Date;
  project: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
export type TaskType = {
  title: string;
  description: string;
  creator: string;
  assignee: string;
  priority: PriorityTaskType;
  project: string;
  dueDate: Date;
};

export type TaskUpdateType = {
  title: string;
  description: string;
  priority: PriorityTaskType;
  dueDate: Date;
};
