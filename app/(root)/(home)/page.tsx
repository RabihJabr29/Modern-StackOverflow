import Filter from "@/components/shared/filters/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

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
    </>
  );
}
