import Link from "next/link";
import React from "react";

const tags: {
  tagName: String;
  tagNumber: number;
}[] = [
  { tagName: "Next.js", tagNumber: 20 },
  { tagName: "React.js", tagNumber: 32 },
  { tagName: "Java", tagNumber: 11 },
  { tagName: "Spring-boot", tagNumber: 19 },
  { tagName: "Rust", tagNumber: 9 },
  { tagName: "SQL", tagNumber: 16 },
];

const PopularTags = () => {
  return (
    <div className="mt-20">
      <h3 className="h3-bold text-dark-100 dark:text-light-900">
        Popular Tags
      </h3>
      <div className="mt-7 flex w-full flex-col gap-2">
        {tags.map((tag) => (
          <Link
            href=""
            key={tag.tagName.toLowerCase()}
            className="flex h-auto cursor-pointer items-center justify-between"
          >
            <div className="background-light700_dark400 flex items-center justify-center rounded-md px-4 py-2">
              <p className="body-regular text-light400_light500">
                {tag.tagName}
              </p>
            </div>
            <p className="small-regular text-dark300_light700">
              {tag.tagNumber}
            </p>
          </Link>
        ))}
      </div>{" "}
    </div>
  );
};

export default PopularTags;
