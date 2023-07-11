import React from "react";

import { InternViewAll } from "../../components/InternViewAll";

export default function InternViewsAll() {
    return (
      <div className="flex flex-col w-full gap-2">
        {/* Title Container */}
        <div className="flex flex-col gap-4 justify-between rounded-t px-4 mb-4 pb-6 border-b-2 border-gray-400">
          <div className="font-semibold text-2xl">
            <h3>Interns Views</h3>
          </div>
          <InternViewAll></InternViewAll>
        </div>
        
      </div>
    );
  }