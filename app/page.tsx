"use client";

import SignOutButton from "./components/auth/SignoutButton";
import { useSession } from "next-auth/react";
import SignInButton from "./components/auth/SigninButton";
import ActivitiesResume from "./components/ActivitiesResume";
import { useEffect, useState } from "react";
import { TTotalActivities } from "./types";
import axios from "axios";
import RegisterForm from "./components/auth/RegisterForm";
import SignInForm from "./components/auth/SignInForm";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [totalActivities, setTotalActivities] =
    useState<TTotalActivities | null>(null);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const code = searchParams.get("code");

  //   if (code) {
  //     // Si un code est présent dans l'URL, tu peux maintenant échanger ce code contre un access_token
  //     console.log("Code reçu de Strava:", code);

  //     // Par exemple, rediriger l'utilisateur vers une API backend pour échanger le code
  //     fetch(`/api/auth/callback?code=${code}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("Données de l'utilisateur après échange du code:", data);
  //         // Traitement des données (stockage dans l'état global, redirection, etc.)
  //       })
  //       .catch((error) => {
  //         console.error("Erreur lors de l'échange du code:", error);
  //       });
  //   }
  // }, [searchParams]);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchTotalActivities = async () => {
        try {
          const response = await axios.get("/api/activities/total");
          setTotalActivities(response.data);
        } catch (err) {
          const error = err as Error;
          setError(error.message);
        }
      };

      fetchTotalActivities();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (!session) {
    return (
      <div>
        <p>
          You are not logged in.
          <SignInButton /> or
        </p>
        <RegisterForm />
        <SignInForm />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Welcome, {session.user?.name}</h1>
        <SignOutButton />
      </div>

      <ActivitiesResume totalActivities={totalActivities} />
    </div>
  );
}
