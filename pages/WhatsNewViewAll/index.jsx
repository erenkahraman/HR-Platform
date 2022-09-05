import React from "react";

import { WhatsNewViewAll } from "../../components/WhatsNewViewAll";
export default function DashboardView() {
  return (
    <div className="flex flex-col w-full">
      <div className="text-xl font-semibold">What&apos;s New View All</div>
      <WhatsNewViewAll />
    </div>
  );
}
