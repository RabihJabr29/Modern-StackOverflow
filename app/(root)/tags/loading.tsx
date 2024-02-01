import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TagsLoading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 max-sm:w-full">All Tags</h1>

      <div className="mt-11 flex  items-center justify-between gap-5 max-sm:flex-row sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="flex min-h-[56px] sm:min-w-[170px]" />
      </div>

      <section className="mt-12 flex flex-wrap gap-6">
        <Skeleton className="h-[170px] w-[240px]" />
        <Skeleton className="h-[170px] w-[240px]" />
        <Skeleton className="h-[170px] w-[240px]" />
        <Skeleton className="h-[170px] w-[240px]" />
        <Skeleton className="h-[170px] w-[240px]" />
        <Skeleton className="h-[170px] w-[240px]" />
        <Skeleton className="h-[170px] w-[240px]" />
      </section>
    </>
  );
};

export default TagsLoading;
