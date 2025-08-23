import { getAttendanceInProject } from "@/backend/api/attendance";
import connectToDB from "@/backend/configs/db";
import { ParamsType } from "@/type/helper";
import { validateId } from "@/validator/helper";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: ParamsType) {
  try {
    const { id } = params;
    const checkId = validateId(id);
    if (!checkId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const res = await getAttendanceInProject(id);
    return res;
  } catch (err) {
    return NextResponse.json({
      message: "server error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
