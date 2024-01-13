import React from "react";
import TopQuestions from "./top-questions/TopQuestions";
import PopularTags from "./popular-tags/PopularTags";

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-fit flex-col justify-between  overflow-y-auto border-l p-6 pt-36 shadow-light-300 max-xl:hidden xl:w-[350px] dark:shadow-none ">
      <TopQuestions />

      <PopularTags />
    </section>
  );
};

export default RightSidebar;
