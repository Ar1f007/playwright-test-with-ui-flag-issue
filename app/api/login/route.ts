import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { email: string; password: string };

  if (body.email === "admin@gmail.com" && body.password === "123456") {
    return NextResponse.json(
      {
        success: true,
        msg: "",
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      msg: "Invalid Credentials",
    },
    {
      status: 400,
    }
  );
}
