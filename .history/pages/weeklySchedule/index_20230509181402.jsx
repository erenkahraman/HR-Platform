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
          {/* Date bar */}
          <div className="flex flex-row items-start px-0 py-0 gap-16 absolute w-395 h-24 left-24 top-154 bg-blue-100 rounded-2xl">
            {/* Add your date content here */}
          </div>
          {/* End of Date bar */}
          {/* Table Container */}
          <div className="flex flex-col items-start px-4 py-3 gap-2 absolute left-24 top-316 bg-red-100 rounded-2xl">
            
            {/* End of table */}
          </div>
          {/* End of Table Container */}
        </div>
      </div>
    </section>
  );
}
