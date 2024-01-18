"use server";

import { connectToDatabase } from "../Mongoose";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
} from "./shared.types";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    // connect to DB
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    // connect to DB
    connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId);

    return { question };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to DB and then makes a document (Question)
    await connectToDatabase();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    // create Tags or get them
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        // Define the query to find the document. In this case, find a document with a name that matches the provided "tag" value in a case-insensitive manner.
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },

        // Define the update operation using the $setOnInsert and $push operators.

        // $setOnInsert: If no matching document is found, this operator will set the specified fields in the document to the specified values. In this case, it sets the "name" field to the provided "tag".
        // $push: Add the specified value to the "question" array field. This is used to associate the current "question._id" with the tag.
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },

        // Options:

        // upsert: If no document is found that matches the query, create a new one with the specified values. This ensures that a document with the specified "name" is created if it doesn't already exist.
        // new: If true, returns the modified document rather than the original. This ensures that the method returns the updated document.
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    // update the question
    await Question.findByIdAndUpdate(question._id, {
      $push: {
        // Specify the field to push values into, which is "tags" in this case.
        tags: {
          // Use the $each modifier to specify an array of values to be added to the "tags" array field.
          $each: tagDocuments,
        },
      },
    });

    // create an interaction record for the user's ask-a-question action

    // increment author's reputation by +5 for creating a question.
    //

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
