import { searchUser } from "@/backend/api/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const isAdmin = true;
    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const body = await req.json();
    const res = await searchUser(body);
    return res;
  } catch (err) {
    return NextResponse.json({
      message: "server err",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
