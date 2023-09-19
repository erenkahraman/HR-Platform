import React from "react";

import { UpcomingViewAll } from "../../components/UpmcomingViewAll";
export default function DashboardView() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
            <h3 className="font-semibold text-2xl">Upcoming</h3>
          </div>
        </div>
      </div>
      <UpcomingViewAll />
    </div>
  );
}
