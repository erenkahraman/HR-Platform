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
          {/* Date Container */}
          <div
            className="flex flex-col items-start gap-10"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "12px 24px",
              gap: "10px",
              position: "absolute",
              width: "443px",
              height: "48px",
              left: "625px",
              top: "154px",
              background: "#DCEBFC",
              borderRadius: "24px",
            }}
          >
            <div className="w-16 h-full bg-gray-200"></div>
            <div className="w-24 h-full bg-gray-200"></div>
          </div>
          {/* End of Date Container */}
          {/* Department Container */}
          <div className="px-4 py-6 flex flex-wrap justify-start items-start gap-12" style={{ width: "1090px", height: "409px" }}>
            <div className="flex-none">
              <h2 className="font-roboto font-medium text-2xl text-black text-center w-full">IT</h2>
              <div className="w-32 h-32 bg-gray-200 rounded-full mt-4"></div>
            </div>
            <div className="flex-none">
              <h2 className="font-roboto font-medium text-2xl text-black text-center w-full">UEX</h2>
              <div className="w-32 h-32 bg-gray-200 rounded-full mt-4"></div>
            </div>
          </div>
          {/* End of Department Container */}
        </div>
      </div>
    </section>
  );
}
