"use client";

import SignInButton from "@/app/components/auth/SigninButton";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchActivities = async () => {
        try {
          const response = await axios.get("/api/user");
          setUser(response.data.user);
        } catch (err) {
          const error = err as Error;
          setError(error.message);
        }
      };

      fetchActivities();
    }
  }, [status]);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      {/* <p>{user.createdAt}</p> */}
    </div>
  );
}
