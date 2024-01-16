import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  const userId = "123456";

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);

  return (
    <div>
      <Question mongoUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default page;
