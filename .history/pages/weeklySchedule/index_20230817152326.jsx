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
  const [weeklySchedule, setWeeklySchedule] = useState({});
  const [departmentNames, setDepartmentNames] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [morningShiftInterns, setMorningShiftInterns] = useState([]);
  const [afternoonShiftInterns, setAfternoonShiftInterns] = useState([]);
  const [assignedShifts, setAssignedShifts] = useState([]);
  const token = cookie.get("token");
  const csvLinkElement = useRef();

  // ... (other existing functions)

  useEffect(() => {
    const fetchWeeklySchedule = async () => {
      try {
        handleCurrentWeekDateRange();

        const token = cookie.get("token");
        if (!token) {
          console.log("Token Expired! error function: fetchweeklyschedule");
          return;
        } else {
          console.log("Token value from fetchweeklyschedule", token);
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            token: token,
          },
        };
        const { data } = await axios.get(`/api/weeklySchedule`, config);

        const weeklyScheduleGroupedByDepartment = data.reduce(
          (departments, item) => {
            const department = departments[item.department] || [];
            department.push(item);
            departments[item.department] = department;
            return departments;
          },
          {}
        );
        setWeeklySchedule(weeklyScheduleGroupedByDepartment);
        const departmentNames = Object.keys(weeklyScheduleGroupedByDepartment);
        setDepartmentNames(departmentNames);
      } catch (e) {
        console.error(e);
      }
    };

    // Load data from localStorage
    const storedData = loadFromLocalStorage();
    setWeeklySchedule(storedData);

    fetchWeeklySchedule();
  }, []);

  const swapShift = (internToBeSwapped, shiftTime) => {
    if (shiftTime === "morning") {
      handleMoveToAfternoon(internToBeSwapped);
    } else if (shiftTime === "afternoon") {
      handleMoveToMorning(internToBeSwapped);
    } else {
      console.log("there is something wrong i can feel it");
    }
  };

  // ... (other existing functions)

  // Save data to localStorage
  const saveToLocalStorage = (data) => {
    localStorage.setItem("weeklyScheduleData", JSON.stringify(data));
  };

  // Load data from localStorage
  const loadFromLocalStorage = () => {
    const storedData = localStorage.getItem("weeklyScheduleData");
    return storedData ? JSON.parse(storedData) : {};
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
          <div
            className="flex flex-col items-center justify-center gap-10 mt-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              margin: "12px 24px",
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
              <thead>
                <tr>
                  <th>INTERNS</th>
                </tr>
              </thead>
              <tbody>
                {departmentNames.map((eachDepartmentName,) => (
                  <React.Fragment key={eachDepartmentName}>
                    <tr>
                      <td colSpan="3">
                        <div>
                          <Button
                            aria-controls={`department-menu-${eachDepartmentName}`}
                            aria-haspopup="true"
                            onClick={() => handleDepartmentClick(eachDepartmentName)}
                            endIcon={<ArrowDropDownIcon />}
                            style={{
                              backgroundColor: eachDepartmentName === selectedDepartment ? "#DCEBFC" : "",
                            }}
                          >
                            {eachDepartmentName}
                          </Button>
                          {eachDepartmentName === selectedDepartment && (
                            <Menu
                              id={`department-menu-${eachDepartmentName}`}
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                            >
                              {weeklySchedule[eachDepartmentName].map((eachIntern, i) => (
                                <MenuItem key={i}>
                                  {eachIntern.student.firstName + " " + eachIntern.student.lastName}
                                </MenuItem>
                              ))}
                            </Menu>
                          )}
                        </div>
                      </td>
                    </tr>
                    
                    {eachDepartmentName === selectedDepartment && (
                      <>
                        {weeklySchedule[eachDepartmentName].map((eachIntern, i) => (
                          <tr key={i}>
                            <td>
                              {eachIntern.student.firstName + " " + eachIntern.student.lastName}
                            </td>
                            <td></td>
                            <td>
                              <div className="button-container">
                                <Button
                                  className="move-button"
                                  style={{
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: "10px",
                                    marginRight: "10px",
                                    padding: "10px 20px",
                                    margin: "2px 40px",
                                  }}
                                  onClick={() => handleMoveToMorning(eachIntern, i)}
                                >
                                  Move to Morning
                                </Button>
                                <Button
                                  className="move-button"
                                  style={{
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: "10px",
                                    padding: "8px 20px",
                                    margin: "0px 5px",
                                  }}
                                  onClick={() => handleMoveToAfternoon(eachIntern, i)}
                                >
                                  Move to Afternoon
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* End of Table */}
        {/* Morning Shift People */}
        <div
          className="flex flex-col items-center justify-center gap-6 mt-4"
          style={{
            margin: "12px 26px",
            padding: "12px 26px",
            background: "#DCEBFC",
            borderRadius: "24px",
          }}
        >
          <h2 className="text-center mb-4"><b>Morning Shift</b></h2>
          <div className="flex justify-center">
            {departmentNames.map((eachDepartmentName) => (
              <table
                key={eachDepartmentName}
                className="font-roboto w-full max-w-screen mx-auto"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "12px 24px",
                  gap: "10px",
                  background: "#DCEBFC",
                  borderRadius: "24px",
                }}
              >
                <thead>
                  <tr>
                  <th>{eachDepartmentName} ({countInternsInDepartments(morningShiftInterns)[eachDepartmentName] || 0})</th>
                  </tr>
                </thead>
                <tbody>
                  {morningShiftInterns.map((eachIntern, i) => {
                    return eachIntern.department !== eachDepartmentName ? null :
                      (
                        <tr key={i}>
                          <td className="flex items-center justify-between">
                            <span>{eachIntern.student.firstName + " " + eachIntern.student.lastName}</span>
                            <Button onClick={() => swapShift(eachIntern, "morning")}>
                              <SwapHorizIcon style={{ marginRight: "5px", }} />
                            </Button>
                          </td>
                        </tr>
                      )
                  })}
                </tbody>
              </table>
            ))}
          </div>
        </div>
        {/* End of Morning Shift People */}
        {/* Afternoon Shift People*/}
        <div
          className="flex flex-col items-center justify-center gap-6 mt-4"
          style={{
            margin: "12px 26px",
            padding: "12px 26px",
            background: "#DCEBFC",
            borderRadius: "24px",
          }}
        >
          <h2 className="text-center mb-4"><b>Afternoon Shift</b></h2>
          <div className="flex justify-center">
            {departmentNames.map((eachDepartmentName) => (
              <table
                key={eachDepartmentName}
                className="font-roboto w-full max-w-screen mx-auto"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "12px 24px",
                  gap: "10px",
                  background: "#DCEBFC",
                  borderRadius: "24px",
                }}
              >
                <thead>
                  <tr>
                  <th>{eachDepartmentName} ({countInternsInDepartments(afternoonShiftInterns)[eachDepartmentName] || 0})</th>
                  </tr>
                </thead>
                <tbody>
                  {afternoonShiftInterns.map((eachIntern, i) => {
                    return eachIntern.department !== eachDepartmentName ? null :
                      (
                        <tr key={i}>
                          <td className="flex items-center justify-between">
                            <span>{eachIntern.student.firstName + " " + eachIntern.student.lastName}</span>
                            <Button onClick={() => swapShift(eachIntern, "afternoon")}>
                              <SwapHorizIcon style={{ marginRight: "5px", }} />
                            </Button>
                          </td>
                        </tr>
                      )
                  })}
                </tbody>
              </table>
            ))}
          </div>
        </div>
        {/* End of Afternoon Shift People */}
        <div className="flex flex-col items-center bg-primary justify-center gap-6 mt-4">
          Click Export to CSV after Modifications
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;