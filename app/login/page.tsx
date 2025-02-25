import { auth } from "@/auth";
import SignIn from "../components/auth/Signin-button";
import { SignOut } from "../components/auth/Signout-button";

export default async function page() {
  const session = await auth();

  return (
    <div>
      <SignIn />
      <SignOut />
      {!session ? (
        <div>Not authenticated</div>
      ) : (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      )}
    </div>
  );
}
