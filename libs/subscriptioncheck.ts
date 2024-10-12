import { auth } from "@clerk/nextjs/server";

import prismadb from "../prisma/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscriptionCheck = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCurrentPeriodStart: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeDescription: true,
    },
  })

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  // return !!isValid;
  return { isValid, currentPeriodEnd: userSubscription.stripeCurrentPeriodEnd, currentPeriodStart: userSubscription.stripeCurrentPeriodStart, description: userSubscription.stripeDescription };
};