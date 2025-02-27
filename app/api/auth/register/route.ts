import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validation des champs
  if (!email) {
    return NextResponse.json(
      { message: "Email et mot de passe sont obligatoires." },
      { status: 400 }
    );
  }

  // Vérification si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "L'utilisateur existe déjà." },
      { status: 400 }
    );
  }

  //   Hachage du mot de passe
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    // Création de l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: removedPassword, ...userWithoutPassword } = newUser;

    // Répondre avec l'utilisateur créé
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
