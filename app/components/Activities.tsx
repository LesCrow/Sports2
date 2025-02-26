// components/Activities.tsx
import { Activity } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Activities = () => {
  const { status } = useSession();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchActivities = async () => {
        try {
          const response = await axios.get("/api/activities");
          setActivities(response.data.activities);
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
  if (error) {
    return <div>{error}</div>;
  }
  console.log(activities);
  return (
    <div>
      <h1>Your Activities</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            <br />
            {activity.distance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
