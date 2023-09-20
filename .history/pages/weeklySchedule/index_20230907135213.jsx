import { Button, Menu, MenuItem } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import React from "react";
import cookie from "js-cookie";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Sidebar } from "flowbite-react";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { SystemUpdateAlt } from "@mui/icons-material";
import { CSVLink } from "react-csv";

const WeeklySchedule = () => {
  const WEEKDAYS = 5;
  const [dateRange, setDateRange] = useState("");
  const [weeklyScheduleByDepartment, setWeeklyScheduleByDepartment] = useState({});
  const [weeklySchedule, setWeeklySchedule] = useState([]);
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
  }, [anchorEl, selectedDepartment]);

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
  }, [morningShiftInterns, afternoonShiftInterns]);

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
          console.log("Token value from fetchWeeklySchedule", token);
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
  }, [morningShiftInterns, afternoonShiftInterns]);

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
      debugger;
      try {

        const deleteResponse = await axios.delete(`/api/weeklySchedule/${document._id}`, config);
        const interns = [];
        setMorningShiftInterns(interns);
        setAfternoonShiftInterns(interns);
      } catch (error) {
        console.error(`Error deleting document with Group: ${document.Group}`, error);
      }
    }
  };

  return (
    <div className="min-h-screen  ">
      <div className="container w-full flex-grow  mx-auto">
        <div className=" flex w-full flex-col   items-center justify-center min-w-0 break-words w-full rounded">
          <div className="flex justify-between gap-4 rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">
                Weekly Schedule
              </h1>
            </div>
            <div>
              <CSVLink ref={csvLinkElement} data={assignedShifts} filename={"assigned-shifts.csv"}></CSVLink>
              <Button
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
          <div
            className="flex flex-col items-center justify-center w-full mb-0 px-4 py-6"
            style={{ backgroundColor: "#fafafa" }}
          >
            <div className="flex w-full justify-center">
              <p className="text-lg text-blueGray-500 font-roboto">
                {dateRange}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-4 mb-0 px-4 py-6">
            <Button
              size="medium"
              startIcon={<SwapHorizIcon className="text-sm" />}
              variant="contained"
              sx={{ borderRadius: 2 }}
              href="#"
              onClick={() => resetShifts()}
            >
              Reset Shifts
            </Button>
            <div>
              <Button
                size="medium"
                color="primary"
                endIcon={<ArrowDropDownIcon />}
                variant="outlined"
                sx={{ borderRadius: 2 }}
                href="#"
                onClick={handleMenuOpen}
              >
                {selectedDepartment || "All Departments"}
              </Button>
              <Menu
                id="department-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={() => handleDepartmentClick("All Departments")}>
                  All Departments
                </MenuItem>
                {departmentNames.map((departmentName, index) => (
                  <MenuItem
                    key={index}
                    id={`department-menu-${departmentName}`}
                    onClick={() => handleDepartmentClick(departmentName)}
                  >
                    {departmentName}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-white border-collapse w-full table-fixed">
              <thead>
                <tr>
                  <th className="w-1/4 border-t px-6 py-3 text-blueGray-800 align-middle border-b border-blueGray-200 text-left uppercase border-r-0 whitespace-nowrap font-semibold text-sm">
                    Name
                  </th>
                  <th className="w-1/4 border-t px-6 py-3 text-blueGray-800 align-middle border-b border-blueGray-200 text-left uppercase border-r-0 whitespace-nowrap font-semibold text-sm">
                    Department
                  </th>
                  <th className="w-1/4 border-t px-6 py-3 text-blueGray-800 align-middle border-b border-blueGray-200 text-left uppercase border-r-0 whitespace-nowrap font-semibold text-sm">
                    Morning Shift
                  </th>
                  <th className="w-1/4 border-t px-6 py-3 text-blueGray-800 align-middle border-b border-blueGray-200 text-left uppercase whitespace-nowrap font-semibold text-sm">
                    Afternoon Shift
                  </th>
                </tr>
              </thead>
              <tbody>
                {departmentNames.map((departmentName, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td
                        className="border-t px-6 py-4 border-blueGray-200 text-blueGray-700 whitespace-nowrap font-roboto text-sm"
                        colSpan="4"
                      >
                        {departmentName}
                      </td>
                    </tr>
                    {weeklyScheduleByDepartment[departmentName].map(
                      (intern, internIndex) => (
                        <tr
                          key={internIndex}
                          className="border-t border-blueGray-300 text-blueGray-700 hover:bg-blueGray-100"
                        >
                          <td className="border-t px-6 py-4 whitespace-nowrap font-roboto text-sm">
                            {intern.student.firstName} {intern.student.lastName}
                          </td>
                          <td className="border-t px-6 py-4 whitespace-nowrap font-roboto text-sm">
                            {intern.department}
                          </td>
                          <td className="border-t px-6 py-4 whitespace-nowrap font-roboto text-sm">
                            {intern.Schedule.morning.length === 0 
                              ? "Available"
                              : intern.Schedule.morning.map(
                                  (morningShift, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center"
                                    >
                                      {morningShift.intern}
                                      <button
                                        className="ml-2 text-blue-500"
                                        onClick={() =>
                                          swapShift(
                                            morningShift.intern,
                                            "morning"
                                          )
                                        }
                                      >
                                        Swap
                                      </button>
                                    </div>
                                  )
                                )}
                          </td>
                          <td className="border-t px-6 py-4 whitespace-nowrap font-roboto text-sm">
                            {intern.Schedule.afternoon.length === 0
                              ? "Available"
                              : intern.Schedule.afternoon.map(
                                  (afternoonShift, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center"
                                    >
                                      {afternoonShift.intern}
                                      <button
                                        className="ml-2 text-blue-500"
                                        onClick={() =>
                                          swapShift(
                                            afternoonShift.intern,
                                            "afternoon"
                                          )
                                        }
                                      >
                                        Swap
                                      </button>
                                    </div>
                                  )
                                )}
                          </td>
                        </tr>
                      )
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;
