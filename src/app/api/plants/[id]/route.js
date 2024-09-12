import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, options) {
  const id = options.params.id;
  console.log("SEL ID", id);

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }
  let updatedPlant;
  try {
    updatedPlant = await prisma.plant.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: `No plant found with id ${id}`,
      },
      { status: 404 }
    );
  }

  const _updatedPlant = { ...updatedPlant, ...body };
  console.log(_updatedPlant);
  let newPlant;
  try {
    newPlant = await prisma.plant.update({
      where: {
        id: Number(id),
      },
      data: {
        name: _updatedPlant.name,
        description: _updatedPlant.description,
        category: _updatedPlant.category,
        quantity: _updatedPlant.quantity,
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Plant updated.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json(newPlant);
}

export async function DELETE(req, options) {
  const id = options.params.id;
  console.log("SEL ID", id);
  let selectedPlant;
  try {
    selectedPlant = await prisma.plant.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: `No plant found with id ${id}`,
      },
      { status: 404 }
    );
  }
  try {
    await prisma.plant.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Failed to delete Plant.",
      },
      { status: 400 }
    );
  }

  return new Response(null, { status: 204 });
}
