import { Button, Menu, MenuItem } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import React from "react";
import cookie from "js-cookie";



import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import ComputerIcon from '@mui/icons-material/Computer';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import GavelIcon from '@mui/icons-material/Gavel';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';



import { SystemUpdateAlt } from "@mui/icons-material";
import { CSVLink } from "react-csv";

const WeeklySchedule = () => {
  const WEEKDAYS = 5;
  const [dateRange, setDateRange] = useState("");
  const [weeklyScheduleByDepartment, setWeeklyScheduleByDepartment] = useState({});
  const [weeklySchedule, setWeeklySchedule] = useState([]); // Add this state variable
  const [populatedWeeklySchedule, setPopulatedWeeklySchedule] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [morningShiftInterns, setMorningShiftInterns] = useState([]);
  const [afternoonShiftInterns, setAfternoonShiftInterns] = useState([]);
  const [assignedShifts, setAssignedShifts] = useState([]);
  const token = cookie.get("token");
  const csvLinkElement = useRef();
  const [availableMorningShiftInterns, setAvailableMorningShiftInterns] = useState([]);
  const [availableAfternoonShiftInterns, setAvailableAfternoonShiftInterns] = useState([]);

  const departmentKeys = Object.keys(weeklyScheduleByDepartment);
  const iconsForDepartments = {
    "Project Management": {
      1: <ManageAccountsIcon></ManageAccountsIcon>,
      2: <ChecklistRtlIcon></ChecklistRtlIcon>
    },
    "Information Technologies": {
      1: <GitHubIcon></GitHubIcon>,
      2: <CodeIcon></CodeIcon>
    },
    "Business & Data Analysis": {
      1: <BusinessIcon></BusinessIcon>,
      2: <BarChartIcon></BarChartIcon>
    },
    "Digital Marketing": {
      1: <ComputerIcon></ComputerIcon>,
      2: <LocalGroceryStoreIcon></LocalGroceryStoreIcon>
    },
    "Human Resources": {
      1: <PersonIcon></PersonIcon>,
      2: <WorkIcon></WorkIcon>
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorEl && !event.target.closest(`#department-menu-${selectedDepartment}`)) {
        setAnchorEl(null);
        setSelectedDepartment(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDepartment(null);
  };

  const handleDepartmentClick = (department) => {
    setSelectedDepartment((prevDepartment) =>
      prevDepartment === department ? null : department
    );
  };

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDay = dd + '/' + mm + '/' + yyyy;

    return formattedDay
  }

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const substractDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  const handleCurrentWeekDateRange = () => {
    const currentDate = new Date();
    const todayNameIndex = currentDate.getDay();
    const firstDayOfTheWeek = substractDays(currentDate, todayNameIndex - 1);
    const formattedFirstDayOfTheWeek = formatDate(firstDayOfTheWeek);
    const lastDayOfTheWeek = addDays(currentDate, WEEKDAYS - todayNameIndex);
    const formattedLastDayOfTheWeek = formatDate(lastDayOfTheWeek);
    const weekDateRange = `${formattedFirstDayOfTheWeek} - ${formattedLastDayOfTheWeek}`;
    setDateRange(weekDateRange);
  }

  const handleMoveToMorning = async (internToBeMoved, internIndex) => {
    try {
      // Remove the intern from the afternoon shift
      const updatedAfternoonShiftInterns = afternoonShiftInterns.filter(
        (intern) => intern._id !== internToBeMoved._id
      );

      // Add the intern to the morning shift
      const updatedMorningShiftInterns = [...morningShiftInterns, internToBeMoved];

      // Update state with the new intern lists
      setAfternoonShiftInterns(updatedAfternoonShiftInterns);
      setMorningShiftInterns(updatedMorningShiftInterns);

      // Update the WeeklySchedule model in the database
      const response = await axios.put(`/api/weeklySchedule?token=${token}`, {
        params: {
          scheduleGroup: {
            Group: internToBeMoved.department, // Use the selected department
            shift: "morning",
            internId: internToBeMoved._id,
          },
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoveToAfternoon = async (internToBeMoved, internIndex) => {
    try {
      // Remove the intern from the morning shift
      const updatedMorningShiftInterns = morningShiftInterns.filter(
        (intern) => intern._id !== internToBeMoved._id
      );

      // Add the intern to the afternoon shift
      const updatedAfternoonShiftInterns = [
        ...afternoonShiftInterns,
        internToBeMoved,
      ];

      // Update state with the new intern lists
      setMorningShiftInterns(updatedMorningShiftInterns);
      setAfternoonShiftInterns(updatedAfternoonShiftInterns);

      // Update the WeeklySchedule model in the database
      const response = await axios.put(`/api/weeklySchedule?token=${token}`, {
        params: {
          scheduleGroup: {
            Group: internToBeMoved.department, // Use the selected department
            shift: "afternoon",
            internId: internToBeMoved._id,
          },
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };




  const handleExportToCsv = () => {
    let shiftAssignedInterns = [];
    morningShiftInterns.forEach((morningIntern) => {
      const assignedInternInfo = getAssignedInternInfo(morningIntern, "Morning");
      shiftAssignedInterns.push(assignedInternInfo);
    });
    afternoonShiftInterns.forEach((afternoonIntern) => {
      const assignedInternInfo = getAssignedInternInfo(afternoonIntern, "Afternoon");
      shiftAssignedInterns.push(assignedInternInfo);
    });
    setAssignedShifts(shiftAssignedInterns);
    const downloadedCsvFile = setTimeout(function () {
      csvLinkElement.current.link.click();
    }, 1000);
  };

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        handleCurrentWeekDateRange();

        const token = cookie.get("token");
        if (!token) {
          console.log("Token Expired! error function: fetchInterns");
          return;
        }
        else {
          console.log("Token value from fetchInterns", token)
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            token: token,
          },
        };

        const { data } = await axios.get(`/api/internTest`, config);

        const weeklyScheduleGroupedByDepartment = data.reduce(
          (departments, item) => {
            const department = departments[item.department] || [];
            department.push(item);
            departments[item.department] = department;
            return departments;
          },
          {}
        );

        setWeeklyScheduleByDepartment(weeklyScheduleGroupedByDepartment);
        const departmentNames = Object.keys(weeklyScheduleGroupedByDepartment);
        setDepartmentNames(departmentNames);

      } catch (e) {
        console.error(e);
      }
    };
    fetchInterns();
  }, [morningShiftInterns, afternoonShiftInterns]); // Add these dependencies

  useEffect(() => {
    const fetchInterns2 = async () => {
      try {
        handleCurrentWeekDateRange();

        const token = cookie.get("token");
        if (!token) {
          console.log("Token Expired! error function: fetchInterns");
          return;
        }
        else {
          console.log("Token value from fetchInterns", token);
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            token: token,
          },
        };
        const response = await axios.get(`/api/weeklySchedule`, config);
        const data2 = response.data;

        // Filter out assigned interns
        const morningShiftInternsBefore = data2.populatedWeeklySchedule.map(intern => intern.Schedule.morning);
        const afternoonShiftInternsBefore = data2.populatedWeeklySchedule.map(intern => intern.Schedule.afternoon);
        const morningShiftInterns = morningShiftInternsBefore.flat();
        const afternoonShiftInterns = afternoonShiftInternsBefore.flat();

        setAvailableMorningShiftInterns(morningShiftInterns);
        setAvailableAfternoonShiftInterns(afternoonShiftInterns);
      } catch (e) {
        console.error(e);
      }
    };
    fetchInterns2();
  }, [morningShiftInterns, afternoonShiftInterns]);

  useEffect(() => {
    const fetchWeeklySchedule = async () => {
      try {
        handleCurrentWeekDateRange();
        const token = cookie.get("token");
        if (!token) {
          console.log("Token Expired! error function: fetchWeeklySchedule");
          return;
        }
        else {
          console.log("Token value from fetchWeeklySchedule", token)
        }

        const response = await axios.get(`/api/weeklySchedule?token=${token}`);
        const { weeklySchedule, populatedWeeklySchedule } = response.data;

        // Update state with the new data
        setWeeklySchedule(weeklySchedule);
        setPopulatedWeeklySchedule(populatedWeeklySchedule);

      } catch (e) {
        console.error(e);
      }
    };
    fetchWeeklySchedule();
  }, [morningShiftInterns, afternoonShiftInterns]); // Add these dependencies  


  const findInternByName = (name) => {
    // Iterate through all departments to find the intern by name
    for (const departmentName of departmentNames) {
      const departmentInterns = weeklyScheduleByDepartment[departmentName];
      const intern = departmentInterns.find((intern) => {
        const fullName = intern.student.firstName + " " + intern.student.lastName;
        return fullName === name;
      });
      if (intern) {
        return intern;
      }
    }
    return null; // Return null if the intern is not found
  };

  const swapShift = (internName, shiftTime) => {
    const internToBeSwapped = findInternByName(internName);

    if (!internToBeSwapped) {
      console.log("Intern not found");
      return;
    }

    if (shiftTime === "morning") {
      handleMoveToAfternoon(internToBeSwapped);
    } else if (shiftTime === "afternoon") {
      handleMoveToMorning(internToBeSwapped);
    } else {
      console.log("Invalid shift time");
    }
  };


  const getAssignedInternInfo = (intern, shiftTime) => {
    const assignedIntern = {
      "First Name": intern.student.firstName,
      "Last Name": intern.student.lastName,
      "Department": intern.department,
      "Shift": shiftTime,
    };
    return assignedIntern;
  };


  const resetShifts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        token: token,
      },
    };
    const response = await axios.get(`/api/weeklySchedule`, config);
    const data2 = response.data;

    for (const document of data2.populatedWeeklySchedule) {
      try {

        const deleteResponse = await axios.delete(`/api/weeklySchedule/${document._id}`, config);
        const interns = [];
        setMorningShiftInterns(interns);
        setAfternoonShiftInterns(interns);
      } catch (error) {
        console.error(`Error deleting document with Group: ${document.Group}`, error);
      }
    }
  }

  return (
    <div className="h-[100%] flex flex-col items-center">
      <div className="flex flex-col mt-10 border-b-2 border-blueGray-300 pb-5 px-[10rem]">
        <div className="flex justify-center gap-x-4 ">
          <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">
            Weekly Schedule
          </h1>
        </div>
        <div className="flex flex-col items-center mt-5">
          <strong>{dateRange}</strong>
          <button onClick={() => resetShifts()} > RESET WEEK </button>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <span className="text-2xl font-bold uppercase text-center mb-5"> Available Interns </span>
        <div className="grid grid-cols-3 gap-10">
          {departmentKeys.map((department) => (
            <div className="min-w-[10rem] max-w-[25rem] border-black border-2 border-solid">
              <div className=" flex justify-evenly border-b-2 border-black border-solid h-10 items-center">
                {iconsForDepartments[department][1]}
                <span>
                  {department}
                </span>
                {iconsForDepartments[department][2]}
              </div>
              <div className="p-5 flex flex-col gap-y-2">
                {weeklyScheduleByDepartment[department]
                  .filter(
                    (eachIntern) => (
                      !availableMorningShiftInterns.some(
                        (shiftIntern) =>
                          shiftIntern === (eachIntern.student.firstName + ' ' + eachIntern.student.lastName)) &&
                      !availableAfternoonShiftInterns.some(
                        (shiftIntern) =>
                          shiftIntern === (eachIntern.student.firstName + ' ' + eachIntern.student.lastName)
                      )
                    ))
                  .map((eachIntern, i) => (
                    <>
                      {console.log(eachIntern)}
                      <div className="flex gap-x-5">
                        <Button
                          className="move-button bg-white text-black text-xs rounded-[10px]  py-[10px] px-[10px]"
                          onClick={() => handleMoveToMorning(eachIntern, i)}
                        >
                          Morning
                        </Button>
                        <div className="flex flex-grow items-center">
                          {eachIntern.student.firstName + " " + eachIntern.student.lastName}
                        </div>
                        <Button
                          className="move-button bg-white text-black text-xs rounded-[10px]  py-[10px] px-[10px]"
                          onClick={() => handleMoveToAfternoon(eachIntern, i)}
                        >
                          Afternoon
                        </Button>
                      </div>
                    </>
                  ))}

              </div>
            </div>
          ))}

          <div className="min-w-[10rem] max-w-[25rem] border-black border-2 border-solid">
            <div className=" flex justify-evenly border-b-2 border-black border-solid h-10 items-center">
              <BusinessIcon></BusinessIcon>
              <span>
                Business Lawyer
              </span>
              <GavelIcon></GavelIcon>
            </div>

          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col w-[100%]">
        <span className="text-2xl font-bold uppercase text-center mb-5">Shifts</span>
        <div className="grid grid-cols-2 gap-10">
          <div className="w-[100%]">
            <div className="w-[100%] text-center">
              MORNING
            </div>
            {populatedWeeklySchedule.map((schedule) => (
              <div className="w-[75%] mx-auto" key={schedule._id}>
                <div className="w-[100%] mx-auto mt-5">
                  <div className="text-xl border-b-2 border-sky-200 border-solid">{schedule.Group} <span>[{schedule.Schedule.morning.length}]</span></div>
                  <div className="grid grid-cols-3 gap-5 pt-5">
                    {schedule.Schedule.morning.map((internName, index) => (
                      <li key={index}>
                        {internName}
                        <Button onClick={() => swapShift(internName, "morning")}>
                          Swap Shift
                        </Button>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-[100%]">
            <div className="w-[100%] text-center">
              AFTENOON
            </div>
            {populatedWeeklySchedule.map((schedule) => (
              <div className="w-[75%] mx-auto" key={schedule._id}>
                <div className="w-[100%] mx-auto mt-5">
                  <div className="text-xl border-b-2 border-sky-200 border-solid">{schedule.Group} <span>[{schedule.Schedule.afternoon.length}]</span></div>
                  <div className="grid grid-cols-3 gap-5 pt-5">
                    {schedule.Schedule.afternoon.map((internName, index) => (
                      <li key={index}>
                        {internName}
                        <Button onClick={() => swapShift(internName, "afternoon")}>
                          Swap Shift
                        </Button>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center my-20">
        <CSVLink ref={csvLinkElement} data={assignedShifts} filename={"assigned-shifts.csv"}></CSVLink>
        <Button
          className="w-[13rem]"
          size="medium"
          color="primary"
          startIcon={<SystemUpdateAlt className="text-sm" />}
          variant="contained"
          sx={{ borderRadius: 2 }}
          href="#"
          onClick={handleExportToCsv}
        >
          Export to CSV
        </Button>
      </div>
    </div>
  );
};

export default WeeklySchedule;





/*
Unused imports, variables and code

import { Sidebar } from "flowbite-react";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';





*/