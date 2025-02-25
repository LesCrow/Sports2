import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  if (req.auth) {
    // Récupérer l'utilisateur connecté à partir de la base de données avec Prisma
    const user = await prisma.user.findUnique({
      where: {
        id: req.auth.user?.id,
      },
    });

    if (user) {
      return NextResponse.json({
        message: "User found",
        user,
      });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  }

  return NextResponse.json(
    { message: "User is not authenticated" },
    { status: 401 }
  );
});
