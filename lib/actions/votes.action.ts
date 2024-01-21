"use server";

import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../Mongoose";
import { AnswerVoteParams, QuestionVoteParams } from "./shared.types";
import Answer from "@/database/answer.model";

// Utility functions

const getUpvoteUpdateQuery = (
  hasupVoted: boolean,
  userId: string,
  hasdownVoted: boolean
) => {
  let updateQuery = {};

  if (hasupVoted) {
    updateQuery = { $pull: { upVotes: userId } };
  } else if (hasdownVoted) {
    updateQuery = {
      $pull: { downVotes: userId },
      $addToSet: { upVotes: userId },
    };
  } else {
    updateQuery = { $addToSet: { upVotes: userId } };
  }

  return updateQuery;
};

const getDownvoteUpdateQuery = (
  hasdownVoted: boolean,
  userId: string,
  hasupVoted: boolean
) => {
  let updateQuery = {};

  if (hasdownVoted) {
    updateQuery = { $pull: { downVotes: userId } };
  } else if (hasupVoted) {
    updateQuery = {
      $pull: { upVotes: userId },
      $addToSet: { downVotes: userId },
    };
  } else {
    updateQuery = { $addToSet: { downVotes: userId } };
  }
  return updateQuery;
};

// Question voting

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    const updateQuery = getUpvoteUpdateQuery(hasupVoted, userId, hasdownVoted);

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    const updateQuery = getDownvoteUpdateQuery(
      hasdownVoted,
      userId,
      hasupVoted
    );

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Answer Voting

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    const updateQuery = getUpvoteUpdateQuery(hasupVoted, userId, hasdownVoted);

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downVotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upVotes: userId },
        $addToSet: { downVotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downVotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
