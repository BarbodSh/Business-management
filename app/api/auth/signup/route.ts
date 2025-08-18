import { createUser } from "@/backend/api/user";
import connectToDB from "@/backend/configs/db";
import { SignupType } from "@/type/user";
import { signupValidate } from "@/validator/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: SignupType = await req.json();
    const validate = signupValidate(body);
    if (validate !== true) {
      return NextResponse.json({ message: validate }, { status: 400 });
    }
    await connectToDB();
    const res = await createUser(body);
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
