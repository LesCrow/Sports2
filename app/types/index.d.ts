import { SportType } from "@prisma/client";

export type TTotalActivities = {
  distance: number;
  moving_time: number;
  activitiesCount: number;
  totalBySport: [
    {
      sport_type: SportType;
      _sum: { distance: number; moving_time: number };
      _count: { id: number };
    }
  ];
};

export type TTotalActivitiesWithoutTotalBySport = Omit<
  TTotalActivities,
  "totalBySport"
>;
