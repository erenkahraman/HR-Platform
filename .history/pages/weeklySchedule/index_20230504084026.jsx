import { UploadFileOutlined, Verified } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
export default function DashboardView() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const token = cookie?.get("token");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [Group, setGroup] = useState("");

  const [mondayStartTime, setMondayStartTime] = useState("");
  const [mondayEndTime, setMondayEndTime] = useState("");

  const [tuesdayStartTime, setTuesdayStartTime] = useState("");
  const [tuesdayEndTime, setTuesdayEndTime] = useState("");

  const [wednesdayStartTime, setWednesdayStartTime] = useState("");
  const [wednesdayEndTime, setWednesdayEndTime] = useState("");

  const [thursdayStartTime, setThursdayStartTime] = useState("");
  const [thursdayEndTime, setThursdayEndTime] = useState("");

  const [fridayStartTime, setFridayStartTime] = useState("");
  const [fridayEndTime, setFridayEndTime] = useState("");

  const clearScheduleFields = () => {
    setGroup("");
    setMondayStartTime("");
    setMondayEndTime("");
    setTuesdayStartTime("");
    setTuesdayEndTime("");
    setWednesdayStartTime("");
    setWednesdayEndTime("");
    setThursdayStartTime("");
    setThursdayEndTime("");
    setFridayStartTime("");
    setFridayEndTime("");
  };

  const handleAddSchedule = async () => {
    try {
      setOpen(true);
      const scheduleGroup = {
        Group: Group,
        Schedule: {
          monday: { startTime: mondayStartTime, endTime: mondayEndTime },
          tuesday: { startTime: tuesdayStartTime, endTime: tuesdayEndTime },
          wednesday: {
            startTime: wednesdayStartTime,
            endTime: wednesdayEndTime,
          },
          thursday: { startTime: thursdayStartTime, endTime: thursdayEndTime },
          friday: { startTime: fridayStartTime, endTime: fridayEndTime },
        },
        token: token,
      };

      const JSONGroup = JSON.stringify(scheduleGroup);
      const endpointWeeklySchedule = "/api/weeklySchedule";
      const optionsWeeklySchedule = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSONGroup,
      };
      await fetch(endpointWeeklySchedule, optionsWeeklySchedule);
      alert("Group Added successfully");
    } catch (e) {
      alert("Group Couldn't Added");
      console.error(e);
    }
  };

  const handleRemoveSchedule = async (event) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.delete(
        `/api/weeklySchedule`,
        { params: { token: token, Group: Group } },
        config
      );
      setLoading(false);
      clearScheduleFields();
      alert("Removed");
    } catch (e) {
      alert("not Removed");
      console.error(e);
      setLoading(false);
    }
  };
  const handleEditSchedule = async (event) => {
    setLoading(true);
    const scheduleGroup = {
      Group: Group,
      Schedule: {
        monday: { startTime: mondayStartTime, endTime: mondayEndTime },
        tuesday: { startTime: tuesdayStartTime, endTime: tuesdayEndTime },
        wednesday: { startTime: wednesdayStartTime, endTime: wednesdayEndTime },
        thursday: { startTime: thursdayStartTime, endTime: thursdayEndTime },
        friday: { startTime: fridayStartTime, endTime: fridayEndTime },
      },
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.put(
        `/api/weeklySchedule`,
        { params: { token: token, scheduleGroup: scheduleGroup } },
        config
      );
      setLoading(false);
      alert("Updated.");
    } catch (e) {
      alert("not Updated.");
      console.error(e);
      setLoading(false);
    }
  };
  const handleSwapSchedule = async (event) => { };
  const handleMatchGroup = async (event) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/weeklySchedule/matchGroup`,
        { params: { token: token, Group: Group } },
        config
      );
      setData(data);
      setLoading(false);

      clearScheduleFields();

      // Defination
      setGroup(data.Group);
      setMondayStartTime(data.Schedule.monday.startTime);
      setMondayEndTime(data.Schedule.monday.endTime);
      setTuesdayStartTime(data.Schedule.tuesday.startTime);
      setTuesdayEndTime(data.Schedule.tuesday.endTime);
      setWednesdayStartTime(data.Schedule.wednesday.startTime);
      setWednesdayEndTime(data.Schedule.wednesday.endTime);
      setThursdayStartTime(data.Schedule.thursday.startTime);
      setThursdayEndTime(data.Schedule.thursday.endTime);
      setFridayStartTime(data.Schedule.friday.startTime);
      setFridayEndTime(data.Schedule.friday.endTime);
      // Defination
      alert("Match found");
    } catch (e) {
      alert("Match Couldn't found");
      console.error(e);
      setLoading(false);
    }
  };
  const handleMatchIntern = async (event) => { };

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Weekly Schedule</h1>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="flex flex-col items-center justify-center p-6 mt-6 text-left border w-96 rounded-xl">
            <h2 className="text-2xl font-bold">Add Schedule</h2>
            <div className="flex flex-col items-center justify-center mt-6">
              <input
                type="text"
                placeholder="Group"
                value={Group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-64 h-10 px-5 pr-16 text-sm border rounded-xl"
              />
              <input

                type="text"
                placeholder="Monday Start Time"
                value={mondayStartTime}
                onChange={(e) => setMondayStartTime(e.target.value)}
                className="w-64 h-10 px-5 pr-16 text-sm border rounded-xl"
              />
              <input
                type="text"
                placeholder="Monday End Time" 
                value={mondayEndTime}
                onChange={(e) => setMondayEndTime(e.target.value)}
                className="w-64 h-10 px-5 pr-16 text-sm border rounded-xl"
              />
              <input
                type="text"
                placeholder="Tuesday Start Time"
                value={tuesdayStartTime}
                onChange={(e) => setTuesdayStartTime(e.target.value)}
                className="w-64 h-10 px-5 pr-16 text-sm border rounded-xl"
              />
              </div>
            <div/>
            </div>
            </div>
            

    </div>

    
  );
}
