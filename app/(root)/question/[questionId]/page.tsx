import { getQuestionById } from "@/lib/actions/question.action";
import React from "react";

const QuestionDetailsPage = async ({
  params,
}: {
  params: { questionId: string };
}) => {
  const { questionId } = params;
  const results = await getQuestionById({ questionId });
  const { question } = results;
  return <div>{question.title}</div>;
};

export default QuestionDetailsPage;
