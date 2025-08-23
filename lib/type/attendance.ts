import mongoose, { Document } from "mongoose";

export interface attendanceSchemaEntry extends Document {
  user: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  date: Date;
  sessions: [
    {
      checkIn: Date;
      checkOut: Date;
      duration: number;
    }
  ];
}

export type checkInType = {
  userId: string;
  projectId: string;
};
