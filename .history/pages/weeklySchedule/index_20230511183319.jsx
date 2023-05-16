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
  
  useEffect(() => {
		const asyncRequest = async () => {
		  try {
			const config = {
			  headers: {
				"Content-Type": "application/json",
			  },
			};
			const { data } = await axios.get(
			  `/api/weeklySchedule`,
			  { params: { token: token } },
			  config
			);
			console.log("this is the front-end part")
			console.log(data);
			
			console.log("if we group them together")
			const weeklyScheduleGroupedByDepartment = data.reduce((departments, item) => {
				const department = (departments[item.department] || []);
				department.push(item);
				departments[item.department] = department;
				return departments;
			  }, {});
			  console.log(weeklyScheduleGroupedByDepartment)
			  setWeeklySchedule(weeklyScheduleGroupedByDepartment)

			const departmentNames = Object.keys(weeklyScheduleGroupedByDepartment);
			setDepartmentNames(departmentNames)
			
		  } catch (e) {
			console.error(e);
		}
		};
		asyncRequest();
	  }, []);

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
