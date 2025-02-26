// components/SignOutButton.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const { data: session } = useSession(); // Vérifie si l'utilisateur est connecté
  const router = useRouter();

  const handleSignOut = async () => {
    // Appeler la fonction signOut de NextAuth.js
    await signOut({ redirect: false }); // Ne pas rediriger automatiquement après la déconnexion
    router.push("/"); // Rediriger vers la page de connexion après déconnexion
  };

  if (!session) {
    return null; // Ne pas afficher le bouton si l'utilisateur n'est pas connecté
  }

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
