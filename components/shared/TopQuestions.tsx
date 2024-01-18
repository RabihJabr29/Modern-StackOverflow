import { getQuestions } from "@/lib/actions/question.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopQuestions = async () => {
  const results = await getQuestions({});

  return (
    <>
      <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      <div className="mt-7 flex w-full flex-col gap-8">
        {results.questions.map((question) => (
          <Link
            href={`/question/${question._id}`}
            key={question._id}
            className="flex h-auto cursor-pointer items-center justify-between gap-8"
          >
            <p className="body-medium text-dark500_light700">
              {question.title}
            </p>
            <Image
              src="/assets/icons/chevron-right.svg"
              alt="chevron-right"
              width={20}
              height={20}
              className="invert-colors"
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default TopQuestions;
