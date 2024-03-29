"use server";

import { connectToDatabase } from "../Mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import User from "@/database/user.model";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const user = await User.create(userData);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = userData;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(userData: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = userData;

    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database. everything.

    // delete user's questions

    // const userQuestionsIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findOneAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Save or UnSave questions

export async function saveQuestion({
  userId,
  questionId,
  path,
}: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    await User.findByIdAndUpdate(userId, { $addToSet: { saved: questionId } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function unSaveQuestion({
  userId,
  questionId,
  path,
}: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    await User.findByIdAndUpdate(userId, { $pull: { saved: questionId } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
