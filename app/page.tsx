"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";

export default function Home() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
      <p>{user.activities_count}</p>
    </div>
  );
}
