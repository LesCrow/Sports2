"use client";

import ActivitiesTable from "@/app/components/ActivitiesTable";
import NewActivityForm from "@/app/components/NewActivityForm";

export default function ActivitiesPage() {
  return (
    <div>
      <NewActivityForm />
      <ActivitiesTable />
    </div>
  );
}
