import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Activity } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = auth(async (req, { params }) => {
  const userId = req.auth?.user?.id;

  // Si l'utilisateur n'est pas connecté, retourner une erreur 401
  if (!userId) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour accéder à cette ressource." },
      { status: 401 }
    );
  }

  // Vérification que params est défini et contient bien un ID
  const { id } = (await params) as { id?: string }; // Utiliser une assertion de type

  // Si l'ID de l'activité est inexistant ou invalide
  if (!id || typeof id !== "string") {
    return NextResponse.json(
      {
        error: "L'ID de l'activité est requis et doit être une chaîne valide.",
      },
      { status: 400 }
    );
  }

  try {
    // Chercher l'activité avec Prisma
    const activity = await prisma.activity.findUnique({
      where: { id },
    });

    // Si l'activité n'est pas trouvée
    if (!activity) {
      return NextResponse.json(
        { error: "Activité non trouvée." },
        { status: 404 }
      );
    }

    // Vérifiez si l'activité appartient à l'utilisateur connecté
    if (activity.userId !== userId) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à voir cette activité." },
        { status: 403 }
      );
    }

    // Retourner l'activité trouvée
    return NextResponse.json(activity, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'activité:", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la récupération de l'activité.",
      },
      { status: 500 }
    );
  }
});

export const PUT = auth(async (req, { params }) => {
  const userId = req.auth?.user?.id; // Récupérer l'ID de l'utilisateur connecté

  // Si l'utilisateur n'est pas connecté, retourner une erreur 401
  if (!userId) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour mettre à jour cette activité." },
      { status: 401 }
    );
  }

  // Vérification que params est défini et contient bien un ID
  const { id } = (await params) as { id?: string }; // Utiliser une assertion de type

  // Si l'ID de l'activité est inexistant ou invalide
  if (!id || typeof id !== "string") {
    return NextResponse.json(
      {
        error: "L'ID de l'activité est requis et doit être une chaîne valide.",
      },
      { status: 400 }
    );
  }

  try {
    // Chercher l'activité avec Prisma
    const activity = await prisma.activity.findUnique({
      where: { id },
    });

    // Si l'activité n'est pas trouvée
    if (!activity) {
      return NextResponse.json(
        { error: "Activité non trouvée." },
        { status: 404 }
      );
    }

    // Vérifiez si l'activité appartient à l'utilisateur connecté
    if (activity.userId !== userId) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à mettre à jour cette activité." },
        { status: 403 }
      );
    }

    // Extraire les données de la requête pour la mise à jour
    const {
      distance,
      moving_time,
      name,
      sport_type,
      type,
      start_date,
      description,
      trainer,
    }: Activity = await req.json();

    // Mettre à jour l'activité dans la base de données
    const updatedActivity = await prisma.activity.update({
      where: { id },
      data: {
        distance,
        moving_time,
        name,
        sport_type,
        type,
        start_date,
        description,
        trainer,
      },
    });

    // Retourner l'activité mise à jour
    return NextResponse.json(updatedActivity, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'activité:", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la mise à jour de l'activité.",
      },
      { status: 500 }
    );
  }
});

export const DELETE = auth(async (req, { params }) => {
  const userId = req.auth?.user?.id; // Récupérer l'ID de l'utilisateur connecté

  // Si l'utilisateur n'est pas connecté, retourner une erreur 401
  if (!userId) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour mettre à jour cette activité." },
      { status: 401 }
    );
  }

  // Vérification que params est défini et contient bien un ID
  const { id } = (await params) as { id?: string }; // Utiliser une assertion de type

  // Si l'ID de l'activité est inexistant ou invalide
  if (!id || typeof id !== "string") {
    return NextResponse.json(
      {
        error: "L'ID de l'activité est requis et doit être une chaîne valide.",
      },
      { status: 400 }
    );
  }

  try {
    // Chercher l'activité avec Prisma
    const activity = await prisma.activity.findUnique({
      where: { id },
    });

    // Si l'activité n'est pas trouvée
    if (!activity) {
      return NextResponse.json(
        { error: "Activité non trouvée." },
        { status: 404 }
      );
    }

    // Vérifiez si l'activité appartient à l'utilisateur connecté
    if (activity.userId !== userId) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à mettre à jour cette activité." },
        { status: 403 }
      );
    }

    // Supprimer l'activité dans la base de données
    const deletedActivity = await prisma.activity.delete({
      where: { id },
    });

    // Retourner l'activité mise à jour
    return NextResponse.json(deletedActivity, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'activité:", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la mise à jour de l'activité.",
      },
      { status: 500 }
    );
  }
});
