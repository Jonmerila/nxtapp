import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { validatePlantData } from "@/utils/helpers/apiHelper";

const prisma = new PrismaClient();

export async function GET(req) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const quantity = url.searchParams.get("quantity");
  let plants = [];
  let filters = {};

  if (category) {
    filters.category = {
      equals: category,
      mode: "insensitive",
    };
  }

  if (quantity) {
    filters.quantity = {
      gt: 0,
    };
  }
  console.log("FILTERS", filters);
  if (filters) {
    plants = await prisma.plant.findMany({
      where: {
        AND: [filters],
      },
    });
    return NextResponse.json(plants);
  }

  plants = await prisma.plant.findMany();
  if (plants.length < 1) {
    return NextResponse.json(
      {
        message: "No plants found.",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(plants);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }
  const [errors, hasErrors] = validatePlantData(body);
  console.log("IS ERROR", hasErrors);
  console.log(errors);
  try {
    if (hasErrors) {
      throw Error("ERROR", errors);
    }
  } catch (e) {
    return NextResponse.json(
      {
        message: errors,
      },
      { status: 400 }
    );
  }

  let newPlant;
  try {
    newPlant = await prisma.plant.create({
      data: {
        name: body.name,
        description: body.description,
        quantity: body.quantity,
        category: body.category,
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: e,
      },
      { status: 400 }
    );
  }
  return NextResponse.json(newPlant, { status: 201 });
}
