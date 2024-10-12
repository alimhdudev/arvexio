import { NextResponse } from "next/server";
import { incrementApiLimit, checkApiLimit } from "../../../../prisma/api-limit"
import { checkSubscription } from "../../../../libs/subscription";

export async function POST() {
    const isPro = await checkSubscription();
};