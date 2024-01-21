"use client";
import { saveQuestion, unSaveQuestion } from "@/lib/actions/user.action";
import {
  downvoteAnswer,
  downvoteQuestion,
  upvoteAnswer,
  upvoteQuestion,
} from "@/lib/actions/votes.action";
import { formatBigNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upVotes: number;
  userHasUpVoted: boolean;
  downVotes: number;
  userHasDownVoted: boolean;
  userHasSaved?: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  upVotes,
  userHasUpVoted,
  downVotes,
  userHasDownVoted,
  userHasSaved,
}: VotesProps) => {
  const path = usePathname();

  const handleSave = async () => {
    if (!userId) {
      return;
    }

    if (userHasSaved) {
      await unSaveQuestion({
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        path,
      });
    } else {
      await saveQuestion({
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        path,
      });
    }
  };

  const handleVote = async (voteType: string) => {
    if (!userId) {
      return;
    }

    switch (voteType) {
      case "upvote":
        if (type === "question") {
          await upvoteQuestion({
            questionId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasupVoted: userHasUpVoted,
            hasdownVoted: userHasDownVoted,
            path,
          });
        } else if (type === "answer") {
          await upvoteAnswer({
            answerId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasupVoted: userHasUpVoted,
            hasdownVoted: userHasDownVoted,
            path,
          });
        }

        break;

      case "downvote":
        if (type === "question") {
          await downvoteQuestion({
            questionId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasupVoted: userHasUpVoted,
            hasdownVoted: userHasDownVoted,
            path,
          });
        } else if (type === "answer") {
          await downvoteAnswer({
            answerId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasupVoted: userHasUpVoted,
            hasdownVoted: userHasDownVoted,
            path,
          });
        }

        break;
      default:
        break;
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        {/* Up Votes */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              userHasUpVoted
                ? "/assets/icons/upVoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="upVote"
            height={18}
            width={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-md p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatBigNumber(upVotes)}
            </p>
          </div>
        </div>

        {/* Down Votes */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              userHasDownVoted
                ? "/assets/icons/downVoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="udownVote"
            height={18}
            width={18}
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-md p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatBigNumber(downVotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "question" && (
        <Image
          src={
            userHasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="starred"
          height={18}
          width={18}
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
