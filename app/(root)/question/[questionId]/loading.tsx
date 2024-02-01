import { Skeleton } from "@/components/ui/skeleton";

const QuestionLoading = () => {
  return (
    <div className="mt-3.5 flex">
      <h2 className="h2-semibold text-dark200_light900 ">
        Loading question details
      </h2>
      <div className="ml-3 flex items-center justify-center gap-2">
        <Skeleton className="h-[16px] w-[16px]" />
        <Skeleton className="h-[16px] w-[16px]" />
        <Skeleton className="h-[16px] w-[16px]" />
      </div>
    </div>
  );
};

export default QuestionLoading;
