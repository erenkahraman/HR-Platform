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

  const handleClickOutside = (event) => {
    if (anchorEl && !anchorEl.contains(event.target)) {
      setAnchorEl(null);
      setSelectedDepartment(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [anchorEl]);

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
    const updatedMorningShiftInterns = [...morningShiftInterns, internToBeMoved];
    setMorningShiftInterns(updatedMorningShiftInterns);
  
    const updatedAfternoonShiftInterns = afternoonShiftInterns.filter(
      (intern) => intern._id !== internToBeMoved._id
    );
    setAfternoonShiftInterns(updatedAfternoonShiftInterns);
  
    const updatedWeeklySchedule = { ...weeklySchedule };
    updatedWeeklySchedule[selectedDepartment] = updatedWeeklySchedule[selectedDepartment].filter(
      (intern) => intern._id !== internToBeMoved._id);
    setWeeklySchedule(updatedWeeklySchedule);
  
    try {
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

      const updatePromises = days.map(async (day) => {
        return axios.put(`/api/weeklySchedule?token=${token}`, {
          params: {
            scheduleGroup: {
              Group: selectedDepartment,
              day: day,
              shift: "morning",
              internId: internToBeMoved._id,
            },
          },
        });
      });

      const responses = await Promise.all(updatePromises);
      console.log(responses.map(response => response.data)); // Log the responses if needed
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleMoveToAfternoon = async (internToBeMoved, internIndex) => {
    const updatedAfternoonShiftInterns = [
      ...afternoonShiftInterns,
      internToBeMoved,
    ];
    setAfternoonShiftInterns(updatedAfternoonShiftInterns);
  
    const updatedMorningShiftInterns = morningShiftInterns.filter(
      (intern) => intern._id !== internToBeMoved._id
    );
    setMorningShiftInterns(updatedMorningShiftInterns);
  
    const updatedWeeklySchedule = { ...weeklySchedule };
    updatedWeeklySchedule[selectedDepartment] = updatedWeeklySchedule[selectedDepartment].filter(
      (intern) => intern._id !== internToBeMoved._id
    );
    setWeeklySchedule(updatedWeeklySchedule);
  
    try {
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

      const updatePromises = days.map(async (day) => {
        return axios.put(`/api/weeklySchedule?token=${token}`, {
          params: {
            scheduleGroup: {
              Group: selectedDepartment,
              day: day,
              shift: "afternoon",
              internId: internToBeMoved._id,
            },
          },
        });
      });

      const responses = await Promise.all(updatePromises);
      console.log(responses.map(response => response.data)); // Log the responses if needed
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
    const fetchWeeklySchedule = async () => {
      try {
        handleCurrentWeekDateRange();

        const token = cookie.get("token");
        if (!token) {
          console.log("Token Expired! error function: fetchweeklyschedule");
          return;
        }
        else{
          console.log("Token value from fetchweeklyschedule",token)
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
    fetchWeeklySchedule();
  }, []);

  const swapShift = (internToBeSwapped, shiftTime) => {

    if (shiftTime === "morning") {
      handleMoveToAfternoon(internToBeSwapped)
    }
    else if (shiftTime === "afternoon") {
      handleMoveToMorning(internToBeSwapped)
    }
    else {
      console.log("there is something wrong i can feel it")
    }
  }

  const countInternsInDepartments = (interns) => {
    const departmentCounts = {};
    interns.forEach((eachIntern) => {
      const departmentName = eachIntern.department;
      if (departmentCounts[departmentName]) {
        departmentCounts[departmentName]++;
      } else {
        departmentCounts[departmentName] = 1;
      }
    });
    return departmentCounts;
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