import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const userId = req.headers.get("userId"); // Utilise l'userId pour identifier l'utilisateur
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.stravaToken) {
    return NextResponse.json(
      { error: "User not found or not authenticated with Strava" },
      { status: 400 }
    );
  }

  try {
    // Récupérer les activités avec l'access token
    const response = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: {
          Authorization: `Bearer ${user.stravaToken}`,
        },
      }
    );

    return NextResponse.json({ activities: response.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
