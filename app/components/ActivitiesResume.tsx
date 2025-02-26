import { SportType } from "@prisma/client";
import { convertMetersToKilometers } from "../utils/distanceUtils";
import { formatSecondsToHMS } from "../utils/timeUtils";
import { TTotalActivities } from "../types";
import Image from "next/image";

interface IActivitiesResumeProps {
  totalActivities: TTotalActivities | null; // TTotalActivities étant le type de données des activités
}

export default function ActivitiesResume({
  totalActivities,
}: IActivitiesResumeProps) {
  const getSportIcon = (sportType: SportType): string => {
    switch (sportType) {
      case "ROLLER":
        return "rollersPic.png";
      case "RUNNING":
        return "runningPic.png";
      case "SWIMMING":
        return "swimmingPic.png";
      case "CYCLING":
        return "cyclingPic.png";
      case "WORKOUT":
        return "workoutPic.png";
      case "CLIMBING":
        return "climbingPic.png";
      case "STRETCH":
        return "yogaPic.png";
      default:
        return "";
    }
  };

  return (
    <div className="h-screen ">
      <h2>All time </h2>
      <div className="h-[35%] border-4 border-black flex flex-col justify-between p-5">
        <div className=" flex justify-around text-center">
          <p>
            <span className="text-4xl">{totalActivities?.activitiesCount}</span>{" "}
            <br />
            Total des activités
          </p>
          <p>
            <span className="text-4xl">
              {totalActivities &&
                convertMetersToKilometers(totalActivities.distance)}
              k
            </span>
            <br />
            Distance totale
          </p>
          <p>
            <span className="text-4xl">
              {totalActivities != undefined &&
                formatSecondsToHMS(totalActivities?.moving_time)}
            </span>
            <br />
            Temps de déplacement total
          </p>
        </div>
        <div className="flex justify-around text-center">
          {totalActivities?.activitiesCount !== 0 ? (
            totalActivities?.totalBySport.map((sport, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={`/images/pictos/${getSportIcon(sport.sport_type)}`}
                  alt="icons"
                  width={50}
                  height={50}
                ></Image>
                <p>{sport._count.id}</p>
                {sport._sum.distance !== 0 ? (
                  <p>{convertMetersToKilometers(sport._sum.distance)}k</p>
                ) : (
                  <p>-</p>
                )}

                <p>{formatSecondsToHMS(sport._sum.moving_time)}</p>
              </div>
            ))
          ) : (
            <div>
              <p>Aucun activité enregistrée</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
