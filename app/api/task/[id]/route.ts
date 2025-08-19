import { removeTask, updateTask } from "@/backend/api/task";
import { validateId } from "@/validator/helper";
import { taskUpdateValidate } from "@/validator/task";
import { ParamsType } from "@/type/helper";
import { NextResponse } from "next/server";
import connectToDB from "@/lib/backend/configs/db";

export async function PUT(req: Request, { params }: ParamsType) {
  try {
    const isAdmin = true;
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const { id } = params;
    const body = await req.json();
    const checkId = validateId(id);
    const validate = taskUpdateValidate(body);
    if (!checkId || validate !== true) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const res = await updateTask(body, id);
    return res;
  } catch (err) {
    return NextResponse.json({
      message: "server err",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

export async function DELETE(req: Request, { params }: ParamsType) {
  try {
    const isAdmin = true;
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const { id } = params;
    const checkId = validateId(id);
    if (!checkId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const res = await removeTask(id);
    return res;
  } catch (err) {
    return NextResponse.json({
      message: "server err",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
