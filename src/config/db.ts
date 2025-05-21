import mongoose from "mongoose";

export const connectDb = async (): Promise<any> => {
  try {
    mongoose.set("strictQuery", true);

    const db = await mongoose.connect(process.env.MONGO_URI!,
  //     {
  //       connectTimeoutMS: 10000,
  // serverSelectionTimeoutMS: 10000,
  //     }
    );

    console.log("db is connected");
    return db;
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
