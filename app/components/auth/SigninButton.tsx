"use client";

import { getStravaAuthUrl } from "@/lib/getStravaUrl";
import Link from "next/link";
import { useCallback, useState } from "react";

const SignInButton = () => {
  const [authToken, setAuthToken] = useState<string>();
  const onSignout = useCallback(() => {
    setAuthToken(undefined);
  }, []);

  return (
    <div>
      {authToken === undefined && (
        <Link href={getStravaAuthUrl()}>
          <button>Sign in with Strava</button>
        </Link>
      )}
      {authToken !== undefined && <button onClick={onSignout}>Sign out</button>}
    </div>
  );
};

export default SignInButton;
