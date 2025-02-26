import { auth } from "@/auth"; // Importation du middleware auth
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    const activities = await prisma.activity.aggregate({
      where: { userId },
      _sum: {
        distance: true,
        moving_time: true,
      },
    });
    const activitiesCount = await prisma.activity.count({
      where: { userId },
    });
    const totalBySport = await prisma.activity.groupBy({
      where: { userId }, // Filtrer par l'ID de l'utilisateur
      by: ["sport_type"],
      _sum: {
        distance: true,
        moving_time: true,
      },
      _count: {
        id: true,
      },
    });

    return NextResponse.json({
      distance: activities._sum.distance,
      moving_time: activities._sum.moving_time,
      activitiesCount,
      totalBySport,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
});
