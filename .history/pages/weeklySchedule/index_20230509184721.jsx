import { UploadFileOutlined, Verified } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";

export default function weeklySchedule() {
  
  return (
    <section className="relative w-full min-h-screen bg-gray-100">
      <div className="w-full ">
        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded bg-white max-w-screen mx-auto">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">Weekly Schedule</h1>
            </div>
          </div>
          {/* End of Title Container */}
              <div className="block w-full overflow-x-auto">
            {/* Date  */}
            <div className="flex flex-row justify-between items-center px-4 py-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-col">
                  <div className="text-sm font-semibold">Date</div>
                  <div className="text-xs font-light">Monday, 20 September 2021</div>

                  </div>
                  <div
                    className="flex flex-col ml-4"
                    style={{ width: "fit-content" }}
                  >
                    <div className="text-sm font-semibold">Time</div>
                    <div className="text-xs font-light">10:00 AM - 11:00 AM</div>


                  </div>
                
                </div>
                </div>
          </div>  
        </div>
      </div>
    </section>
  );
}
