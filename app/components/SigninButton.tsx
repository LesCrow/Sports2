"use server";
import { signIn } from "@/auth";

export default async function SignIn() {
  return (
    <form
      action={async () => {
        await signIn("github", { redirectTo: "/" });
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
