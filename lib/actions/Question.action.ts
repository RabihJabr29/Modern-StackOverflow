"use server";

import { connectToDatabase } from "../Mongoose";

export async function createQuestion(params: any) {
  try {
    // connect to DB and it makes a document (Question)
    await connectToDatabase();
  } catch (error) {}
}
