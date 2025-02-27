"use client";

import ActivityDetails from "@/app/components/ActivityDetails";
import { Activity } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";

export default function ActivityPage() {
  const { status } = useSession();
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchActivities = async () => {
        try {
          const response = await axios.get(`/api/activities/${id}`);
          setActivity(response.data);
        } catch (err) {
          return NextResponse.json(err, { status: 500 });
        }
      };

      fetchActivities();
    }
  }, [id, status]);

  return (
    <div>
      <h1>ACTIVITY DETAILS</h1>
      <ActivityDetails activity={activity} />
    </div>
  );
}
