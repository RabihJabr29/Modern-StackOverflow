import HomeFilters from "@/components/home/HomeFilters";
import NoResults from "@/components/shared/NoResults";
import Filter from "@/components/shared/filters/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questios = [
  {
    _id: 1,
    title: "What reporting tool can be used with Next JS?",
    tags: [
      { _id: 1, name: "Next.jsx" },
      { _id: 2, name: "SQL" },
    ],
    author: "Rabih Jabr",
    upVotes: 10,
    views: 56,
    answers: 2,
    createdAt: "asked 11 days ago",
  },
  {
    _id: 2,
    title: "What reporting tool can be used with Next JS?",
    tags: [
      { _id: 1, name: "CSS" },
      { _id: 2, name: "SQL" },
    ],
    author: "John Doe",
    upVotes: 11,
    views: 32,
    answers: 1,
    createdAt: "asked 3 days ago",
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900 max-sm:w-full">
          All Questions
        </h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="small-medium primary-gradient min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <span className="text-light-900">Ask a Question</span>
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex flex-col items-center justify-between gap-5 max-sm:flex-row sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imageSource="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="flex min-h-[56px] sm:min-width-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questios.length < 0 ? (
          questios.map((question) => "QuestionCard")
        ) : (
          <NoResults
            title="questions"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
