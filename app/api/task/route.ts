import { createTask, getAllTask } from "@/backend/api/task";
import connectToDB from "@/backend/configs/db";
import { taskValidate } from "@/validator/task";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const isAdmin = true;
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    await connectToDB();
    const res = await getAllTask();
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

export async function POST(req: Request) {
  try {
    const isAdmin = true;
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validate = taskValidate(body);
    if (validate !== true) {
      return NextResponse.json({ message: validate }, { status: 400 });
    }

    const res = await createTask(body);
    return res;
  } catch (err) {
    return NextResponse.json({
      message: "server err",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
