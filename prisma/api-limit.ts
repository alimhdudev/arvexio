import { auth } from "@clerk/nextjs/server";

import prismadb from "./prismadb";
import { Constants } from "../public/constants";

export const incrementApiLimit = async () => {

  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

export const resetApiLimitNow = async () => {
  const { userId } = auth();
  if (!userId) {return;}
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: userId },
  });
  await prismadb.userApiLimit.update({
    where: { userId: userId },
    data: { count: userApiLimit.count * 0 },
  });
};

export const checkApiLimit = async () => {
  const MAX_FREE_COUNTS = await Constants();
  
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId
    }
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};