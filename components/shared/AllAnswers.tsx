import { getAllAnswers } from "@/lib/actions/answer.action";
import React from "react";
import Filter from "./filters/Filter";
import { AnswerFilters } from "@/constants/filters";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
interface AllAnswersProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}
const AllAnswers = async (params: AllAnswersProps) => {
  const { questionId, totalAnswers } = params;
  const result = await getAllAnswers({ questionId });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result &&
          result.answers.map((answer: any) => (
            <article key={answer._id} className="light-border border-b-4 py-10">
              <div className="mb-8 flex flex-col-reverse justify-between sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    alt="profile"
                    width={26}
                    height={26}
                    className="rounded-full  max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="text-dark300_light700 ml-2">
                      Answered by{" "}
                      <span className="text-dark400_light900 font-semibold">
                        {answer.author.name}
                      </span>
                    </p>
                    <span className="text-dark300_light700 ml-2 mt-1 text-xs sm:ml-1">
                      {getTimeStamp(answer.createdAt)}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-end">Voting</div>
              </div>

              <div className="p-5">
                <ParseHTML data={answer.content} />
              </div>
            </article>
          ))}
      </div>
    </div>
  );
};

export default AllAnswers;
