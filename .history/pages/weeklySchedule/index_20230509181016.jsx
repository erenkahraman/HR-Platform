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
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-semibold">Weekly Schedule</div> 
          <div className="text-sm font-light">
            <div>posted by</div>
            <div>Admin</div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold">Date</div>
            <div className="text-xs font-light">12/12/2021</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold">Time</div>
            <div className="text-xs font-light">12:00 PM</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold">Title</div>
        <div className="text-xs font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          pellentesque, nisl quis ultrices aliquam, nunc nisl aliquet nunc, nec

        </div>
      </div>
    
    </div>
  );
}

