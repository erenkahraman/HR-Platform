import React from "react";

import { ReminderViewAll } from "../../components/ReminderViewAll";
export default function DashboardView() {
  return (
    <div className="flex flex-col w-full">
      <div className="text-xl font-semibold">Reminder View All</div>
      <ReminderViewAll />
    </div>
  );
}
