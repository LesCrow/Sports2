"use client";

import SignOutButton from "./components/auth/SignoutButton";
import { useSession } from "next-auth/react";
import SignInButton from "./components/auth/SigninButton";
import { useEffect, useState } from "react";
import axios from "axios";
import NewActivityForm from "./components/NewActivityForm";

export default function Home() {
  const { data: session, status } = useSession();
  const [totalActivities, setTotalActivities] = useState<{
    distance: number;
    moving_time: number;
    activitiesCount: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        You are not logged in. <SignInButton />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Welcome, {session.user?.name}</h1>
        <SignOutButton />
      </div>
      <div>
        <h2>Total de mes activités</h2>
        <p>Nombre d&apos;activités : {totalActivities?.activitiesCount}</p>
        <p>Distance totale : {totalActivities?.distance}</p>
        <p>temps total : {totalActivities?.moving_time}</p>
      </div>
      <div>
        <NewActivityForm />
      </div>
    </div>
  );
}
