import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_DB_URL) {
    return console.log("Missing MONGODB_URL");
  }

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "devflow",
    });

    isConnected = true;

    return console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
