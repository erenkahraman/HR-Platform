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
    <div className="flex flex-col w-full">
      <div className="flex flex flex-row items-start gap-16 w-395 h-24">
        <div className="flex flex-col w-395 h-24">
          <h3>Weekly</h3>
        
           
        

    </div>
  );
}
