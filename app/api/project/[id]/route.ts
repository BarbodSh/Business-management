import connectToDB from "@/backend/configs/db";
import {
  getSignleProject,
  removeProject,
  updateProject,
} from "@/backend/api/project";
import { ParamsType } from "@/type/helper";
import { NextResponse } from "next/server";
import { validateId } from "@/validator/helper";
import { projectValidate } from "@/validator/project";

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
    const res = await getSignleProject(id);
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
    const res = await removeProject(id);
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

export async function PUT(req: Request, { params }: ParamsType) {
  try {
    const isAdmin = true;
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const { id } = params;
    const body = await req.json();
    const validateBody = projectValidate(body.title, body.description);
    const checkId = validateId(id);

    if (!checkId || validateBody !== true) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    const res = await updateProject(body, id);
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
