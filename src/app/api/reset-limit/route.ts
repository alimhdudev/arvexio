import { resetApiLimitNow } from "../../../../prisma/api-limit"

export async function POST() {
    await resetApiLimitNow();
};