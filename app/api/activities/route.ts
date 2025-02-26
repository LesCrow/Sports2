import { auth } from "@/auth"; // Importation du middleware auth
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prisma pour la base de données

export const GET = auth(async (req) => {
  const userId = req.auth?.user?.id; // Accédez à l'ID de l'utilisateur depuis le middleware

  // Vérifiez si l'utilisateur est connecté
  if (!userId) {
    return NextResponse.json(
      { error: "You must be signed in to view your activities." },
      { status: 401 }
    );
  }

  // Récupérer les activités de l'utilisateur
  try {
    const activities = await prisma.activity.findMany({
      where: { userId },
    });
    return NextResponse.json({ activities });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
});

export const POST = auth(async (req) => {
  const userId = req.auth?.user?.id; // Accédez à l'ID de l'utilisateur depuis le middleware

  // Vérifiez si l'utilisateur est connecté
  if (!userId) {
    return NextResponse.json(
      { error: "You must be signed in to post an activitiy." },
      { status: 401 }
    );
  }

  // Poster une activité
  try {
    const { distance, moving_time, name, sport_type, type, start_date } =
      await req.json();
    const newActivity = await prisma.activity.create({
      data: {
        distance,
        moving_time,
        name,
        sport_type,
        type,
        start_date,
        userId,
      },
    });
    return NextResponse.json({ newActivity });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
});
