import { UploadFileOutlined, Verified } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";

export default function WeeklySchedule() {
  // Generate the date range
  const startDate = "08.05.2023";
  const endDate = "12.05.2023";
  const dateRange = `${startDate} - ${endDate}`;

  return (
    <section className="relative w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-screen mx-auto">
        <div className="relative flex flex-col items-center justify-center min-w-0 break-words w-full shadow-lg rounded bg-white">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">Weekly Schedule</h1>
            </div>
          </div>
          {/* End of Title Container */}
          {/* Date Container */}
          <div
            className="flex flex-col items-center justify-center gap-10 mt-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              gap: "10px",
              background: "#DCEBFC",
              borderRadius: "24px",
            }}
          >
            <table
              className="font-roboto"
              style={{
                width: "100%",
              }}
            >
              
              <tbody>
                <tr>
                  <td>{dateRange}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* End of Date Container */}
          {/* Table */}
          <div className="mt-10">
            <table
              className="font-roboto w-full max-w-screen mx-auto"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "10px",
                gap: "16px",
                width: "1090px",
                height: "409px",
                flex: "none",
                order: "0",
                flexGrow: "0",
              }}
            >
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Name</th>
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
            </tbody>
            </table>
          </div>
          {/* End of Table */}
        </div>
      </div>
    </section>
  );
}