"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <div>
        {session && <p className="mb-4">Bienvenue {session?.user?.name}</p>}
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </>
  );
}
