import { ProjectSchemaEntry } from "@/lib/type/project";
import mongoose, { Model, Schema } from "mongoose";

const schema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Task",
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Archived"],
      default: "Pending",
    },
    startDate: {
      type: Date,
      default: () => new Date(),
    },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  { timestamps: true }
);

const model: Model<ProjectSchemaEntry> =
  mongoose.models.Project ||
  mongoose.model<ProjectSchemaEntry>("Project", schema);

export default model;
