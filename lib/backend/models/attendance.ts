import { attendanceSchemaEntry } from "@/lib/type/attendance";
import mongoose, { Model, Schema } from "mongoose";

const schema: Schema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  project: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    required: true,
    index: true,
  },
  date: {
    type: Date,
    default: () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    },
  },
  sessions: [
    {
      checkIn: {
        type: Date,
        default: () => new Date(),
      },
      checkOut: {
        type: Date,
      },
      duration: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const model: Model<attendanceSchemaEntry> =
  mongoose.models.Attendance || mongoose.model("Attendance", schema);

export default model;
