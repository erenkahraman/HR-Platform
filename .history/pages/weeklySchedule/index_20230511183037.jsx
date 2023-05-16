import { UploadFileOutlined, Verified } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";

export default function WeeklySchedule() {
  // Define sample data for departments and people
  const departments = [
    { id: 1, name: "Department A", people: ["Person 1", "Person 2", "Person 3"] },
    { id: 2, name: "Department B", people: ["Person 4", "Person 5", "Person 6"] },
    // Add more departments as needed
  ];

  // Define sample date range
  const startDate = "08.05.2023";
  const endDate = "12.05.2023";

  return (
    <section className="relative w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-screen mx-auto">
        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded bg-white">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">
                Weekly Schedule
              </h1>
            </div>
          </div>
          {/* End of Title Container */}

          {/* Date Range */}
          <div className="flex justify-center mt-4">
            <p className="text-lg font-semibold">
              {startDate} - {endDate}
            </p>
          </div>

          {/* Department and People */}
          <div className="px-4 py-6">
            {departments.map((department) => (
              <div key={department.id} className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{department.name}</h2>
                <ul>
                  {department.people.map((person, index) => (
                    <li key={index} className="mb-1">
                      {person}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
