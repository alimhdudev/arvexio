import { NextResponse } from "next/server";
import { incrementApiLimit, checkApiLimit } from "../../../../prisma/api-limit"

export async function POST() {
    // const freeTrial = await checkApiLimit();
    // if (!freeTrial ) {return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });}
    // return freeTrial
    await incrementApiLimit();
};