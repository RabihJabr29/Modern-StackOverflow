"use client";

import React from "react";
import { Button } from "../ui/button";
import { HomePageFilters } from "@/constants/filters";

const HomeFilters = () => {
  const active: string = "frequent";

  return (
    <div className=" flex-wrap gap-3 max-sm:hidden md:flex">
      {HomePageFilters.map((filter) => {
        return (
          <Button
            key={filter.value}
            className={`${
              active === filter.value
                ? "bg-primary-100 text-primary-500 dark:bg-dark-400"
                : "background-light800_dark400  text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
            } body-medium rounded-lg px-6 py-3 shadow-none`}
            onClick={() => {}}
          >
            {filter.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFilters;
