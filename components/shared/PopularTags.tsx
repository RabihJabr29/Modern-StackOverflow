import React from "react";
import RenderTag from "./RenderTag";

const PopularTags = () => {
  const tags: {
    _id: number;
    name: string;
    totalQuestions: number;
  }[] = [
    { _id: 1, name: "Next.js", totalQuestions: 20 },
    { _id: 2, name: "React.js", totalQuestions: 32 },
    { _id: 3, name: "Java", totalQuestions: 11 },
    { _id: 4, name: "Spring-boot", totalQuestions: 19 },
    { _id: 5, name: "Rust", totalQuestions: 9 },
    { _id: 6, name: "SQL", totalQuestions: 16 },
  ];

  return (
    <>
      <h3 className="h3-bold text-dark-100 dark:text-light-900">
        Popular Tags
      </h3>
      <div className="mt-7 flex w-full flex-col gap-2">
        {tags.map(
          (tag: { _id: number; name: string; totalQuestions: number }) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount={true}
            />
          )
        )}
      </div>
    </>
  );
};

export default PopularTags;
