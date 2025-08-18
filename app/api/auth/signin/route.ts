import connectToDB from "@/backend/configs/db";
import { signinUser } from "@/backend/api/user";
import { signinValidate } from "@/validator/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validate = signinValidate(body);
    if (validate !== true) {
      return NextResponse.json({ message: validate }, { status: 400 });
    }

    await connectToDB();
    const res = await signinUser(body);
    return res;
  } catch (err) {
    return NextResponse.json(
      {
        meessage: "server err",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
