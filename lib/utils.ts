import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Helper function to calculate the appropriate unit and value
  const getTimeUnit = (time: number, unit: string): string => {
    const roundedTime = Math.round(time);
    return `${roundedTime} ${unit}${roundedTime !== 1 ? "s" : ""}`;
  };

  // Define time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  // Determine the appropriate time unit
  if (timeDifference < minute) {
    return getTimeUnit(timeDifference / 1000, "second") + " ago";
  } else if (timeDifference < hour) {
    return getTimeUnit(timeDifference / minute, "minute") + " ago";
  } else if (timeDifference < day) {
    return getTimeUnit(timeDifference / hour, "hour") + " ago";
  } else if (timeDifference < month) {
    return getTimeUnit(timeDifference / day, "day") + " ago";
  } else if (timeDifference < year) {
    return getTimeUnit(timeDifference / month, "month") + " ago";
  } else {
    return getTimeUnit(timeDifference / year, "year") + " ago";
  }
};

export const formatBigNumber = (number: number): string => {
  // Define the threshold for millions and thousands
  const millionThreshold = 1e6; // 1 million
  const thousandThreshold = 1e3; // 1 thousand

  // Check if the number is greater than or equal to the million threshold
  if (number >= millionThreshold) {
    // Append 'M' and divide the number by the million factor
    return (number / millionThreshold).toFixed(1) + "M";
  } else if (number >= thousandThreshold) {
    // Append 'K' and divide the number by the thousand factor
    return (number / thousandThreshold).toFixed(1) + "K";
  } else {
    // If the number is below both thresholds, return the original number as a string
    return number.toString();
  }
};
