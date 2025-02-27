// components/Activities.tsx
import { Activity } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { convertMetersToKilometers } from "../utils/distanceUtils";
import { dateUtcToLocalDate, formatSecondsToHMS } from "../utils/timeUtils";

import { formatKey } from "../utils/stringUtils";
import Link from "next/link";
import { NextResponse } from "next/server";

export default function ActivitiesTable() {
  const { status } = useSession();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isActivityDeleted, setIsActivityDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchActivities = async () => {
        try {
          const response = await axios.get("/api/activities");
          setActivities(response.data.activities);
          setIsActivityDeleted(false);
        } catch (err) {
          const error = err as Error;
          setError(error.message);
        }
      };

      fetchActivities();
    }
  }, [status, isActivityDeleted]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handleDelete = async (activityId: string) => {
    try {
      const response = await axios.delete(`/api/activities/${activityId}`);
      setIsActivityDeleted(true);
      alert("Activité supprimée avec succés");
      return NextResponse.json(response, { status: 200 });
    } catch (err) {
      console.error(err);
    }
  };

  // Clés à afficher
  const displayedKeys: (keyof Activity)[] = [
    "name",
    "sport_type",
    "distance",
    "moving_time",
    "average_speed",
  ];

  // Si `activities` est un seul objet, on le transforme en tableau
  const activitiesArray = Array.isArray(activities) ? activities : [activities];

  // Transformer les données
  const formatActivities = (data: Activity[]) => {
    return data.map((item) => ({
      ...item,
      sport_type: item.sport_type.toLowerCase(),
      distance: convertMetersToKilometers(item.distance).toFixed(2),
      moving_time: formatSecondsToHMS(item.moving_time),
      average_speed: item.average_speed.toFixed(2),
      start_date: dateUtcToLocalDate(item.start_date),
    }));
  };

  const formattedActivities = formatActivities(activitiesArray);

  console.log(activities);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {displayedKeys.map((key) => (
              <th key={key as string}>{String(formatKey(key))}</th>
            ))}
            {!Array.isArray(activities) && <th></th>}
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {formattedActivities.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {displayedKeys.map((key) => (
                <td key={key}>
                  {key === "name" ? (
                    <Link
                      href={`/p/activities/${row.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {row[key]}
                    </Link>
                  ) : (
                    String(row[key])
                  )}
                </td>
              ))}
              <td>
                <button onClick={() => handleDelete(row.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
