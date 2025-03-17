const stravaClientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
const stravaRedirectUri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI;

export const getStravaAuthUrl = () => {
  console.log("first");
  return `https://www.strava.com/oauth/authorize?client_id=${stravaClientId}&redirect_uri=${stravaRedirectUri}&response_type=code&%20response_type=force&scope=activity:read`;
};
