"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../Mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return [
      { _id: "1", name: "JavaScript" },
      { _id: "2", name: "Html" },
      { _id: "3", name: "CSS" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
