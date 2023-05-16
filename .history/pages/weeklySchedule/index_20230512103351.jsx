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
          {/* Shift Tables */}
          <div className="mt-8">
            <div className="flex flex-col items-center justify-center">
              <h2 className="font-roboto font-medium text-2xl text-black">Morning Shift</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>IT</td>
                  <td>Eren</td>
                  <td>
                    <div className="button-container">
                      <Button className="move-button">Move to Morning</Button>
                      <Button className="move-button">Move to Afternoon</Button>
                    </div>
                  </td>
                </tr>
                {/* Add more rows for morning shift */}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <div className="flex flex-col items-center justify-center">
              <h2 className="font-roboto font-medium text-2xl text-black">Afternoon Shift</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>UEX</td>
                  <td>Zsofia</td>
                  <td>
                    <div className="button-container">
                      <Button className="move-button">Move to Morning</Button>
                      <Button className="move-button">Move to Afternoon</Button>
                    </div>
                  </td>
                </tr>
                {/* Add more rows for afternoon shift */}
              </tbody>
            </table>
          </div>
          {/* End of Shift Tables */}
        </div>
      </div>
    </section>
  );
}
