"use client";

import { signIn } from "next-auth/react";

const SignInButton = () => {
  const handleSignIn = () => {
    // Sign in avec le fournisseur (ici GitHub)
    signIn("github"); // Vous pouvez remplacer 'github' par d'autres fournisseurs comme 'google', etc.
  };

  return <button onClick={handleSignIn}>Sign In with GitHub</button>;
};

export default SignInButton;
