import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const NoResults = ({
  title,
  description,
  link,
  linkTitle,
}: {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="Illustrations"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="dark-Illustrations"
        width={270}
        height={200}
        className=" hidden object-contain dark:flex"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">
        There are no {title.length > 0 ? title : "items"} to show
      </h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      <Link href={link} className="flex justify-end max-sm:w-full">
        <Button className="paragraph-medium primary-gradient mt-5 min-h-[46px] w-full rounded-lg px-4 py-3 shadow-none">
          <span className="text-light-900">{linkTitle}</span>
        </Button>
      </Link>
    </div>
  );
};

export default NoResults;
