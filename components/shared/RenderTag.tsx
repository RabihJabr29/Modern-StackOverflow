import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      key={_id}
      className="flex h-auto cursor-pointer items-center justify-between gap-2"
    >
      <Badge className="background-light700_dark400 body-medium text-light400_light500 rounded-md border-none px-4 py-2">
        {name}
      </Badge>

      {showCount && (
        <p className="small-regular text-dark300_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
