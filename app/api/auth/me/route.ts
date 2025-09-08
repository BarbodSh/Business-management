import connectToDB from "@/backend/configs/db";
import { getMe } from "@/backend/api/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const res = await getMe(token);
    return res;
  } catch (err) {
    return NextResponse.json({
      message: "server error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
