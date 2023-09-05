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
  },[]);

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
        else{
          console.log("Token value from fetchInterns",token)
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
        else{
          console.log("Token value from fetchWeeklySchedule",token)
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
        <td><strong>{dateRange}</strong></td>
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
  {departmentNames.map((eachDepartmentName) => (
    <React.Fragment key={eachDepartmentName}>
      <tr>
        <td colSpan="3">
          <div>
            <Button
              aria-controls={`department-menu-${eachDepartmentName}`}
              aria-haspopup="true"
              onClick={() => {
                handleDepartmentClick(eachDepartmentName);
              }}
              endIcon={<ArrowDropDownIcon />}
              style={{
                backgroundColor:
                  eachDepartmentName === selectedDepartment ? "#DCEBFC" : "",
              }}
            >
              {eachDepartmentName}
            </Button>
          </div>
        </td>
      </tr>
      {eachDepartmentName === selectedDepartment && (
        <tr>
          <td colSpan="3">
            <Menu
              id={`department-menu-${eachDepartmentName}`}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {weeklyScheduleByDepartment[eachDepartmentName].map(
                (eachIntern, i) => (
                  <MenuItem key={i}>
                    {eachIntern.student.firstName +
                      " " +
                      eachIntern.student.lastName}
                  </MenuItem>
                )
              )}
            </Menu>
          </td>
        </tr>
      )}
      {eachDepartmentName === selectedDepartment && (
        <>
          {weeklyScheduleByDepartment[eachDepartmentName]
            .filter(
              (eachIntern) => (
                !availableMorningShiftInterns.some(
                  (shiftIntern) =>
                  shiftIntern === (eachIntern.student.firstName+ ' ' +eachIntern.student.lastName))&&
                !availableAfternoonShiftInterns.some(
                  (shiftIntern) =>
                  shiftIntern === (eachIntern.student.firstName+ ' ' +eachIntern.student.lastName)
                )
            ))
            .map((eachIntern, i) => (
              <tr key={i}>
                <td>
                  {eachIntern.student.firstName +
                    " " +
                    eachIntern.student.lastName}
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
            {populatedWeeklySchedule.map((schedule) => (
              <table
                key={schedule._id}
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
                  <h3><strong>{schedule.Group} <span>[{schedule.Schedule.morning.length}]</span> </strong></h3>
                  </tr>
                </thead>
                <tbody>
                {schedule.Schedule.morning.map((internName, index) => (
                  <li key={index}>
                    {internName}
                    <Button onClick={() => swapShift(internName, "morning")}>
                      Swap Shift
                    </Button>
                  </li>
                ))}
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
          {populatedWeeklySchedule.map((schedule) => (
              <table
                key={schedule._id}
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
                  <h3><strong>{schedule.Group} <span>[{schedule.Schedule.afternoon.length}]</span> </strong></h3>
                  </tr>
                </thead>
                <tbody>
                {schedule.Schedule.afternoon.map((internName, index) => (
                  <li key={index}>
                    {internName}
                    <Button onClick={() => swapShift(internName, "afternoon")}>
                      Swap Shift
                    </Button>
                  </li>
                ))}
                  </tbody>
              </table>
            ))}
          </div>
        </div>
        {/* End of Afternoon Shift People */}
      </div>
    </div>
  );
};

export default WeeklySchedule;