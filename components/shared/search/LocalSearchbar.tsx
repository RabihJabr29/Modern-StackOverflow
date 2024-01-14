"use client";

import Image from "next/image";
import React from "react";
import { Input } from "../../ui/input";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imageSource: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imageSource,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`${otherClasses} background-light800_darkgradient mx-3 flex min-h-[56px] grow items-center justify-between gap-4 rounded-lg px-4`}
    >
      {iconPosition === "left" && (
        <Image
          src={imageSource}
          alt="search-icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular background-light800_darkgradient no-focus text-dark400_light700 border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imageSource}
          alt="search-icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
