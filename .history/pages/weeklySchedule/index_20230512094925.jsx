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
      <div className="w-full max-w-screen mx-auto">
        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded bg-white">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">Weekly Schedule</h1>
            </div>
          </div>
          {/* End of Title Container */}
          {/* Weekly Schedule Table */}
          <div className="flex flex-col items-center justify-center mt-8">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Department</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>08.05.2023 - 12.05.2023</td>
                  <td>IT</td>
                  <td>Eren</td>
                  <td>
                    <div className="button-container">
                      <button className="move-button">Move to Morning</button>
                      <button className="move-button">Move to Afternoon</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>08.05.2023 - 12.05.2023</td>
                  <td>UEX</td>
                  <td>Zsofia</td>
                  <td>
                    <div className="button-container">
                      <button className="move-button">Move to Morning</button>
                      <button className="move-button">Move to Afternoon</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* End of Weekly Schedule Table */}
        </div>
      </div>
    </section>
  );
}
