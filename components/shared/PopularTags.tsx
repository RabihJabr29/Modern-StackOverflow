import React from "react";
import RenderTag from "./RenderTag";
import { getAllTags } from "@/lib/actions/tag.action";

const PopularTags = async () => {
  const { tags } = await getAllTags({});

  return (
    <>
      <h3 className="h3-bold text-dark-100 dark:text-light-900">
        Popular Tags
      </h3>
      <div className="mt-7 flex w-full flex-col gap-2">
        {tags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            totalQuestions={tag.questions.length}
            showCount={true}
          />
        ))}
      </div>
    </>
  );
};

export default PopularTags;
