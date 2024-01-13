import Image from "next/image";
import Link from "next/link";
import React from "react";

const questions: String[] = [
  "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",

  "Is it only me or the font is bolder than necessary?",
  "Can I get the course for free?",

  "Redux Toolkit Not Updating State as Expected",

  "Async/Await Function Not Handling Errors Properly",
];

const TopQuestions = () => {
  return (
    <div>
      <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      <div className="mt-7 flex w-full flex-col gap-8">
        {questions.map((question) => (
          <Link
            href=""
            key={question.toLowerCase()}
            className="flex h-auto cursor-pointer items-center justify-between gap-8"
          >
            <p className="body-medium text-dark500_light700">{question}</p>
            <Image
              src="/assets/icons/chevron-right.svg"
              width={20}
              height={20}
              alt="chevron-right"
              className="invert-colors"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopQuestions;
