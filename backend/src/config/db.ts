import mongoose from "mongoose";

export const connectTODb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
};
