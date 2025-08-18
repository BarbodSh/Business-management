import connectToDB from "@/backend/configs/db";
import { getAllUser } from "@/backend/api/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const isAdmin = true;
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    await connectToDB();
    const res = await getAllUser();
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
