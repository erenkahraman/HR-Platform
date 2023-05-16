import { UploadFileOutlined, Verified } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";

export default function WeeklySchedule() {
  return (
    <section className="relative w-full min-h-screen bg-gray-100">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded bg-white max-w-screen mx-auto">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">Weekly Schedule</h1>
            </div>
          </div>
          {/* End of Title Container */}
          {/* Table Container */}
          <div className="flex items-start px-4 py-3 gap-2 absolute left-24 top-154 bg-blue-100 rounded-2xl">
            {/* Projects table */}
            <div className="flex flex-col w-full p-8 mx-auto my-8 overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 bg-white">
              <div className="flex items-center justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                  <tbody>
                    <tr className="border-b">
                      <th className="text-left p-3 px-5">Date</th>
                      <th className="text-left p-3 px-5">Time</th>
                      <th className="text-left p-3 px-5">Title</th>
                      <th className="text-left p-3 px-5">Description</th>
                      <th className="text-left p-3 px-5">Action</th>
                    </tr>
                    <tr className="border-b hover:bg-orange-100 bg-gray-100">
                      <td className="p-3 px-5">Monday</td>
                      <td className="p-3 px-5">9:00 AM</td>
                      <td className="p-3 px-5">Weekly Meeting</td>
                      <td className="p-3 px-5">Weekly Meeting</td>
                      </tr>
                    </tbody>
                </table>
              </div>
            </div>
            
            {/* End of Projects table */}
          </div>
        </div>
      </div>
    </section>
  );
}
