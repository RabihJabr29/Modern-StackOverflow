"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../Mongoose";

export async function getUserById({ userId }: { userId: string }) {
  try {
    connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
