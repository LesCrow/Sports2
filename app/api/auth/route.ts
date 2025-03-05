// app/api/auth/route.ts (redirection vers Strava)
import { NextResponse } from "next/server";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_REDIRECT_URI =
  process.env.STRAVA_REDIRECT_URI || "http://localhost:3000"; // URL sans chemin

const stravaRedirectUri = "http://localhost:3000";

export function GET() {
  const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${stravaRedirectUri}&scope=activity:read&state=random_string`;

  return NextResponse.redirect(stravaAuthUrl); // Redirige l'utilisateur vers Strava pour l'authentification
}
