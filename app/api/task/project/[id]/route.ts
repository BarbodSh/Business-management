import { getTaskByUser } from "@/backend/api/task";
import connectToDB from "@/backend/configs/db";
import { validateId } from "@/validator/helper";
import { ParamsType } from "@/type/helper";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: ParamsType) {
  try {
    const isAdmin = true;
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = params;
    const checkId = validateId(id);
    if (!checkId) {
      return NextResponse.json(
        { message: "project data is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const res = await getTaskByUser(id);
    return res;
  } catch (err) {
    return NextResponse.json(
      {
        message: "server err",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
