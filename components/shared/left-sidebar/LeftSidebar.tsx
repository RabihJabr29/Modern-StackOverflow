"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
  const pathName = usePathname();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  overflow-y-auto border-r p-6 pt-36 shadow-light-300 max-sm:hidden lg:w-[266px] dark:shadow-none ">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;

        return (
          <div key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900 "
              }  flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          </div>
        );
      })}

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log in
              </span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="signup"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col gap-4 justify-self-end ">
          <Link
            href="/"
            className="text-dark300_light900 flex items-center justify-start gap-4 rounded-lg bg-transparent p-4"
            onClick={handleSignOut}
          >
            <Image
              src="/assets/icons/close.svg"
              alt="Log out"
              width={20}
              height={20}
            />
            <p className="base-medium max-lg:hidden">Log out</p>
          </Link>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
