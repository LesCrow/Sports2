"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";
import SignOutButton from "./components/auth/SignoutButton";
import { useSession } from "next-auth/react";
import SignInButton from "./components/auth/SigninButton";

export default function Home() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user", {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  console.log(user);

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
  console.log(session);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {user.email}</p>
      <p>Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
      <SignOutButton />
    </div>
  );
}
