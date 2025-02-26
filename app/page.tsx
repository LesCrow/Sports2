"use client";

import SignOutButton from "./components/auth/SignoutButton";
import { useSession } from "next-auth/react";
import SignInButton from "./components/auth/SigninButton";
import NewActivityForm from "./components/NewActivityForm";
import ActivitiesResume from "./components/ActivitiesResume";

export default function Home() {
  const { data: session } = useSession();

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
      <ActivitiesResume />

      <div>
        <NewActivityForm />
      </div>
    </div>
  );
}
