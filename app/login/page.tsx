import { auth } from "@/auth";
import SignIn from "../components/auth/Signin-button";
import { SignOut } from "../components/auth/Signout-button";

export default async function page() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  return (
    <div>
      <SignIn />
      <SignOut />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
