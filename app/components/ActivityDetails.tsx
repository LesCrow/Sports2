import { Activity } from "@prisma/client";
import React from "react";

type Props = {
  activity: Activity | null;
};

function ActivityDetails({ activity }: Props) {
  if (!activity) {
    return <div>Aucune activité disponible</div>;
  }

  return (
    <div>
      <p>name : {activity.name}</p>
      <p>sport type : {activity.sport_type}</p>
      <p>distance : {activity.distance}</p>
      <p>moving time : {activity.moving_time}</p>
      <p>average speed :{activity.average_speed}</p>
      <p>descritption :{activity.description}</p>
      <p>elev high :{activity.elev_high}</p>
      <p>elev low :{activity.elev_low}</p>
      <p>shoe id :{activity.shoeId}</p>
    </div>
  );
}

export default ActivityDetails;
