import { checkOut } from "@/backend/api/attendance";
import connectToDB from "@/backend/configs/db";
import { validateId } from "@/validator/helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validateUserId = validateId(body.userId);
    const validateProjectId = validateId(body.projectId);
    if (!validateUserId || !validateProjectId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const res = await checkOut(body);
    return res;
  } catch (err) {
    return NextResponse.json({
      message: "server error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
