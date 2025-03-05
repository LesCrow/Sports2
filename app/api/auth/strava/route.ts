import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REDIRECT_URI =
  process.env.STRAVA_REDIRECT_URI || "http://localhost:3000";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code is missing" }, { status: 400 });
  }

  console.log(code);

  try {
    const response = await axios.post(
      "https://www.strava.com/oauth/token",
      null,
      {
        params: {
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          code: "8e791e223aae2d4427cb77267d6febc10eef3b55",
          grant_type: "authorization_code",
          redirect_uri: STRAVA_REDIRECT_URI,
        },
      }
    );

    return NextResponse.json("icic c paris");

    const { access_token, refresh_token, athlete } = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Affiche la réponse détaillée de l'erreur venant de Strava
      console.error("Axios Error: ", error.response?.data);
      console.error("Axios Status: ", error.response?.status);
      console.error("Axios Headers: ", error.response?.headers);
    } else {
      console.error("Unknown Error: ", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
