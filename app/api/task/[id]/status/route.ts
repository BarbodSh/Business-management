import { updateStatusTask } from "@/lib/backend/api/task";
import connectToDB from "@/lib/backend/configs/db";
import { verifyToken } from "@/lib/backend/utils/helper";
import { ParamsType } from "@/lib/type/helper";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: ParamsType) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const body = await req.json();
    const { id } = params;
    await connectToDB();
    const res = await updateStatusTask(
      body,
      id,
      typeof decoded !== "string" && decoded.id
    );
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
