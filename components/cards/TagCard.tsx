import Link from "next/link";
import React from "react";

interface TagCardProps {
  tag: {
    _id: string;
    name: string;
    description: string;
    questions: string[]; // to change to a reference
  };
}

const TagCard = ({ tag }: TagCardProps) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[240px]"
    >
      <article className="background-light800_darkgradient light-border flex w-full flex-col justify-center rounded-2xl border p-8">
        <div className="background-light700_dark400 w-fit rounded-lg px-5 py-1.5 ">
          <p className="paragraph-semibold text-dark300_light900 capitalize">
            {tag.name}
          </p>
        </div>

        <p className="small-regular text-dark400_light500 mt-3">
          That is a cool language or framework or tool
        </p>
        <p className="small-medium text-dark300_light700 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {tag.questions.length}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
