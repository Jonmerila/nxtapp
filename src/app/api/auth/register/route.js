import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { signJWT } from "@/utils/helpers/authHelpers";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  console.log(body.name);

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json(
      {
        message: "A valid JSON body has to be sent in",
      },
      { status: 400 }
    );
  }

  const uniqueUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  try {
    if (uniqueUser) {
      throw new Error();
    }
  } catch (e) {
    return NextResponse.json(
      {
        message: "Email already exists",
      },
      { status: 400 }
    );
  }
  // if (uniqueUser) {

  //   }

  //   try {
  //     const allUsers = await prisma.user.findUniqueOrThrow({
  //       where: {
  //         email: body.email,
  //       },
  //     });
  //   } catch (e) {
  //     return NextResponse.json(
  //       {
  //         message: "Email already exists.",
  //         e,
  //       },
  //       { status: 400 }
  //     );
  //   }

  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    console.table(newUser);

    const token = await signJWT({ userId: newUser.id });
    console.log("USERTOKEN", token);

    return NextResponse.json({ newUser, token });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Failed to create user.",
        e,
      },
      { status: 400 }
    );
  }
}
