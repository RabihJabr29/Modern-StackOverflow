import QuestionCard from "@/components/cards/QuestionCard";
import NoResults from "@/components/shared/NoResults";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { IQuestion } from "@/database/question.model";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import React from "react";

const TagDetailsPage = async ({ params, searchParams }: URLProps) => {
  const results = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 max-sm:w-full">
        {results.tagTitle}
      </h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imageSource="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {results.questions.length > 0 ? (
          results.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upVotes={question.upVotes.length}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResults
            title={`${results.tagTitle.toUpperCase()} tagged Questions`}
            description="Ask a question and add this tag to it! 💡"
            link="/ask-questions"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default TagDetailsPage;
