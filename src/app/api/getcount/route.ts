import { getApiLimitCount } from "../../../../prisma/api-limit";

export async function GET() {
    const count = await getApiLimitCount();
};