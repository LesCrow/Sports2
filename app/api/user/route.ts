import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
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

export const PUT = auth(async (req) => {
  if (req.auth) {
    try {
      const { image, name, weight }: User = await req.json();
      const updatedUser = await prisma.user.update({
        where: { id: req.auth.user?.id },
        data: {
          image,
          name,
          weight,
        },
      });

      return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", error);
      return NextResponse.json(
        {
          error:
            "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
        },
        { status: 500 }
      );
    }
  }
});
