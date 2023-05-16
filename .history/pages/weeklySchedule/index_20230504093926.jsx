import { UploadFileOutlined, Verified } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
export default function DashboardView() {
  
  return (
    <section className="relative w-full min-h-screen bg-gray-100">
      <div className="w-full ">
        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg  rounded bg-white max-w-[1182px] mx-auto">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">Weekly Schedule</h1>
            </div>
          </div>
          {/* Rest of your content goes here */}
        </div>
      </div>
    </section>



  );
}
