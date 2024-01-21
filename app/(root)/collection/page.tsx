import QuestionCard from "@/components/cards/QuestionCard";
import NoResults from "@/components/shared/NoResults";
import Filter from "@/components/shared/filters/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs";

const CollectionPage = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return;
  }

  const result = await getSavedQuestions({ clerkId });

  const { savedQuestions } = result;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 max-sm:w-full">
        Saved Questions
      </h1>

      <div className="mt-11 flex flex-row items-center justify-between gap-5">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imageSource="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="flex min-h-[56px] sm:min-width-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {savedQuestions.length > 0 ? (
          savedQuestions.map((question) => (
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
            title="Saved Questions"
            description=" You can save question now! navigate to any question and click on the star icon on the top right! 💡"
            link="/"
            linkTitle="Go to All Questions"
          />
        )}
      </div>
    </>
  );
};

export default CollectionPage;
