import Link from "next/link";
import React from "react";

interface TagCardProps {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
    //   tags: [];
  };
}

const UserCard = async ({ tag }: TagCardProps) => {
  const tags = await getAllTags();

  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light800_darkgradient light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        {tag.name}
        {/* <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          {topInteractedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {topInteractedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div> */}
      </article>
    </Link>
  );
};

export default UserCard;
