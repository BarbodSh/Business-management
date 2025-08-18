import { removeUser, updateUser } from "@/backend/api/user";
import { signupValidate } from "@/validator/user";
import { ParamsType } from "@/type/helper";
import { validateId } from "@/validator/helper";
import { NextResponse } from "next/server";

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
    const res = await removeUser(id);
    return res;
  } catch (err) {
    return NextResponse.json({
      message: "server err",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

export async function PUT(req: Request, { params }: ParamsType) {
  try {
    const body = await req.json();
    const { id } = params;
    const checkId = validateId(id);
    const validarteBody = signupValidate(body);
    if (!checkId || !validarteBody) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    const res = await updateUser(body, id);
    return res;
  } catch (err) {
    return NextResponse.json({
      message: "server err",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
