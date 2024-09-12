import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { signJWT } from "@/utils/helpers/authHelpers";

const prisma = new PrismaClient();

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    if (!body.email || !body.password) {
      throw new Error();
    }
  } catch (e) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    console.log("USER", user);

    if (!user || user.password !== body.password || user.email !== body.email) {
      throw new Error("user not found");
    }

    const token = await signJWT({
      userId: user.id,
    });
    return NextResponse.json({ user, token });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Invalid Email/password.",
      },
      { status: 400 }
    );
  }
}
