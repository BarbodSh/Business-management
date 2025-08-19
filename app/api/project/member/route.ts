import { addMember, removeMember } from "@/backend/api/project";
import { ParamsType } from "@/type/helper";
import { validateId } from "@/validator/helper";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: ParamsType) {
  try {
    const isAdmin = true;
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const { id } = params;
    const body = await req.json();

    if (!Array.isArray(body.membersId) || body.membersId.length === 0) {
      return NextResponse.json(
        { message: "you must provide at least one memberId" },
        { status: 400 }
      );
    }

    for (const memberId of body.membersId) {
      if (!validateId(memberId)) {
        return NextResponse.json(
          { message: `memberId ${memberId} is not valid` },
          { status: 400 }
        );
      }
    }

    const checkId = validateId(id);
    if (!checkId) {
      return NextResponse.json(
        { message: "project data is not valid" },
        { status: 400 }
      );
    }

    const res = await addMember(body, id);
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
    const body = await req.json();

    if (!Array.isArray(body.membersId) || body.membersId.length === 0) {
      return NextResponse.json(
        { message: "you must provide at least one memberId" },
        { status: 400 }
      );
    }

    for (const memberId of body.membersId) {
      if (!validateId(memberId)) {
        return NextResponse.json(
          { message: `memberId ${memberId} is not valid` },
          { status: 400 }
        );
      }
    }

    const checkId = validateId(id);
    if (!checkId) {
      return NextResponse.json(
        { message: "project data is not valid" },
        { status: 400 }
      );
    }

    const res = await removeMember(body, id);
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
