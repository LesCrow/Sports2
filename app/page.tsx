"use client";

import SignOutButton from "./components/auth/SignoutButton";
import { useSession } from "next-auth/react";
import SignInButton from "./components/auth/SigninButton";
import Activities from "./components/Activities";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
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
      {" "}
      <div>
        <h1>Welcome, {session.user?.name}</h1>

        <SignOutButton />
      </div>{" "}
      <div>
        <Activities />
      </div>
    </div>
  );
}
