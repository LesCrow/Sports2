"use client";

import SignOutButton from "./components/auth/SignoutButton";
import { useSession } from "next-auth/react";
import SignInButton from "./components/auth/SigninButton";
import ActivitiesResume from "./components/ActivitiesResume";
import { useEffect, useState } from "react";
import { TTotalActivities } from "./types";
import axios from "axios";
import RegisterForm from "./components/auth/RegisterForm";

export default function Home() {
  const { data: session, status } = useSession();
  const [totalActivities, setTotalActivities] =
    useState<TTotalActivities | null>(null);

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
        <p>
          You are not logged in.
          <SignInButton /> or
          <RegisterForm />
        </p>
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
