import { createProject, getAllProject } from "@/backend/api/project";
import connectToDB from "@/backend/configs/db";
import { verifyToken } from "@/lib/backend/utils/helper";
import { validateId } from "@/lib/validator/helper";
import { projectValidate } from "@/lib/validator/project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const isAdmin = true;
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    await connectToDB();
    const res = await getAllProject();
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

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const validate = await projectValidate(body.title, body.description);
    const checkId = validateId(
      typeof decoded === "object" && decoded !== null && decoded.id
    );
    if (validate !== true || !checkId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const res = await createProject(
      body,
      typeof decoded === "object" && decoded !== null && decoded.id
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
