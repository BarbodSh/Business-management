import mongoose, { Document } from "mongoose";

export type statusProject =
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
  status: statusProject;
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
