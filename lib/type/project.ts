import mongoose, { Document } from "mongoose";

export type StatusProject =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Archived";

export type PriorityProject = "Low" | "Medium" | "High";

export interface ProjectSchemaEntry extends Document {
  title: string;
  description: string;
  creator: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  tasks: mongoose.Types.ObjectId[];
  status: StatusProject;
  startDate: Date;
  dueDate: Date;
  priority: PriorityProject;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectType = {
  title: string;
  description: string;
  members: string[];
  dueDate: Date;
  priority: PriorityProject;
};

export type ProjectUpdateType = {
  title: string;
  description: string;
  status: StatusProject;
  dueDate: Date;
  priority: PriorityProject;
};
