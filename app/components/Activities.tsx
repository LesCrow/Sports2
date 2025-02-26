// components/Activities.tsx
import { Activity } from "@prisma/client";
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
          const response = await fetch("/api/activities");
          const data = await response.json();

          if (response.ok) {
            setActivities(data.activities);
          } else {
            setError(data.error || "Failed to fetch activities");
          }
        } catch (err) {
          setError("An error occurred while fetching activities");
          console.error(err);
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
