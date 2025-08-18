import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("DB Connection Is Successfully");
    return true;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
};

export default connectToDB;
