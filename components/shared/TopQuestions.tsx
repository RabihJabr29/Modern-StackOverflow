import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopQuestions = () => {
  const questions: { _id: number; text: string }[] = [
    {
      _id: 1,
      text: "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    { _id: 2, text: "Is it only me or the font is bolder than necessary?" },
    { _id: 3, text: "Can I get the course for free?" },
    { _id: 4, text: "Redux Toolkit Not Updating State as Expected" },
    { _id: 5, text: "Async/Await Function Not Handling Errors Properly" },
  ];

  return (
    <>
      <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      <div className="mt-7 flex w-full flex-col gap-8">
        {questions.map((question: { _id: number; text: string }) => (
          <Link
            href=""
            key={question._id}
            className="flex h-auto cursor-pointer items-center justify-between gap-8"
          >
            <p className="body-medium text-dark500_light700">{question.text}</p>
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
