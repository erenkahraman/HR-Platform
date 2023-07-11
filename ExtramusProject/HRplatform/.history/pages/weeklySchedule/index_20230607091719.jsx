import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { CSVLink } from "react-csv";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { SystemUpdateAlt } from "@mui/icons-material";

const WeeklySchedule = () => {
  const WEEKDAYS = 5;
  const [dateRange, setDateRange] = useState("");
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [morningShiftInterns, setMorningShiftInterns] = useState([]);
  const [afternoonShiftInterns, setAfternoonShiftInterns] = useState([]);
  const [assignedShifts, setAssignedShifts] = useState([]);

  const token = cookie.get("token");

  const csvLinkElement = useRef();

  useEffect(() => {
    const asyncRequest = async () => {
      try {
        handleCurrentWeekDateRange();
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get("/api/weeklySchedule", {
          params: { token: token },
          config,
        });
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
    asyncRequest();
  }, []);

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

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedDay = dd + "/" + mm + "/" + yyyy;
    return formattedDay;
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const substractDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };

  const handleCurrentWeekDateRange = () => {
    const currentDate = new Date();
    const weekStart = substractDays(currentDate, currentDate.getDay() - 1);
    const weekEnd = addDays(weekStart, WEEKDAYS - 1);
    const formattedStartDate = formatDate(weekStart);
    const formattedEndDate = formatDate(weekEnd);
    const formattedDateRange = formattedStartDate + " - " + formattedEndDate;
    setDateRange(formattedDateRange);
  };

  const handlePreviousWeekDateRange = () => {
    const currentStartDate = weeklySchedule[departmentNames[0]][0].date;
    const previousWeekStart = substractDays(currentStartDate, WEEKDAYS);
    const previousWeekEnd = substractDays(currentStartDate, 1);
    const formattedStartDate = formatDate(previousWeekStart);
    const formattedEndDate = formatDate(previousWeekEnd);
    const formattedDateRange = formattedStartDate + " - " + formattedEndDate;
    setDateRange(formattedDateRange);
  };

  const handleNextWeekDateRange = () => {
    const currentStartDate = weeklySchedule[departmentNames[0]][0].date;
    const nextWeekStart = addDays(currentStartDate, WEEKDAYS);
    const nextWeekEnd = addDays(nextWeekStart, WEEKDAYS - 1);
    const formattedStartDate = formatDate(nextWeekStart);
    const formattedEndDate = formatDate(nextWeekEnd);
    const formattedDateRange = formattedStartDate + " - " + formattedEndDate;
    setDateRange(formattedDateRange);
  };

  const handleShiftSwap = (selectedIntern, shiftType) => {
    if (shiftType === "morning") {
      setMorningShiftInterns((prevInterns) =>
        prevInterns.filter((intern) => intern !== selectedIntern)
      );
      setAfternoonShiftInterns((prevInterns) =>
        prevInterns.concat(selectedIntern)
      );
    } else if (shiftType === "afternoon") {
      setAfternoonShiftInterns((prevInterns) =>
        prevInterns.filter((intern) => intern !== selectedIntern)
      );
      setMorningShiftInterns((prevInterns) =>
        prevInterns.concat(selectedIntern)
      );
    }
  };

  const handleExportToCsv = () => {
    const csvData = assignedShifts.map((shift) => ({
      Date: formatDate(shift.date),
      Department: shift.department,
      MorningShift: shift.morningIntern,
      AfternoonShift: shift.afternoonIntern,
    }));
    csvLinkElement.current.link.click();
  };

  const getMorningShiftIntern = (department) => {
    const intern = assignedShifts.find(
      (shift) =>
        shift.department === department &&
        shift.date === weeklySchedule[department][0].date
    )?.morningIntern;
    return intern || "";
  };

  const getAfternoonShiftIntern = (department) => {
    const intern = assignedShifts.find(
      (shift) =>
        shift.department === department &&
        shift.date === weeklySchedule[department][0].date
    )?.afternoonIntern;
    return intern || "";
  };

  const handleShiftAssignment = (department) => {
    const morningIntern = getMorningShiftIntern(department);
    const afternoonIntern = getAfternoonShiftIntern(department);
    setMorningShiftInterns((prevInterns) =>
      prevInterns.filter((intern) => intern !== morningIntern)
    );
    setAfternoonShiftInterns((prevInterns) =>
      prevInterns.filter((intern) => intern !== afternoonIntern)
    );
    setSelectedDepartment(null);
    setAssignedShifts((prevShifts) =>
      prevShifts.filter(
        (shift) =>
          shift.department !== department ||
          shift.date !== weeklySchedule[department][0].date
      )
    );
    const nextDepartmentIndex = departmentNames.indexOf(department) + 1;
    if (nextDepartmentIndex < departmentNames.length) {
      setSelectedDepartment(departmentNames[nextDepartmentIndex]);
    }
  };

  const handleMorningShiftAssignment = (department, intern) => {
    const assignedShift = {
      date: weeklySchedule[department][0].date,
      department: department,
      morningIntern: intern,
      afternoonIntern: getAfternoonShiftIntern(department),
    };
    setMorningShiftInterns((prevInterns) =>
      prevInterns.filter((prevIntern) => prevIntern !== intern)
    );
    setSelectedDepartment(null);
    setAssignedShifts((prevShifts) => [...prevShifts, assignedShift]);
    const nextDepartmentIndex = departmentNames.indexOf(department) + 1;
    if (nextDepartmentIndex < departmentNames.length) {
      setSelectedDepartment(departmentNames[nextDepartmentIndex]);
    }
  };

  const handleAfternoonShiftAssignment = (department, intern) => {
    const assignedShift = {
      date: weeklySchedule[department][0].date,
      department: department,
      morningIntern: getMorningShiftIntern(department),
      afternoonIntern: intern,
    };
    setAfternoonShiftInterns((prevInterns) =>
      prevInterns.filter((prevIntern) => prevIntern !== intern)
    );
    setSelectedDepartment(null);
    setAssignedShifts((prevShifts) => [...prevShifts, assignedShift]);
    const nextDepartmentIndex = departmentNames.indexOf(department) + 1;
    if (nextDepartmentIndex < departmentNames.length) {
      setSelectedDepartment(departmentNames[nextDepartmentIndex]);
    }
  };

  return (
    <div>
      <div className="header">
        <Button
          variant="contained"
          color="primary"
          startIcon={<SystemUpdateAlt />}
          onClick={handleExportToCsv}
        >
          Export to CSV
        </Button>
        <CSVLink
          headers={[
            { label: "Date", key: "Date" },
            { label: "Department", key: "Department" },
            { label: "Morning Shift", key: "MorningShift" },
            { label: "Afternoon Shift", key: "AfternoonShift" },
          ]}
          data={csvData}
          filename={"weekly_schedule.csv"}
          className="hidden"
          ref={csvLinkElement}
        >
          Export
        </CSVLink>
      </div>
      <div className="date-range">
        <Button variant="outlined" onClick={handlePreviousWeekDateRange}>
          Previous Week
        </Button>
        <span>{dateRange}</span>
        <Button variant="outlined" onClick={handleNextWeekDateRange}>
          Next Week
        </Button>
      </div>
      <div className="schedule">
        {departmentNames.map((department) => (
          <div className="department" key={department}>
            <Button
              variant="outlined"
              startIcon={<ArrowDropDownIcon />}
              onClick={handleMenuOpen}
            >
              {department}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {departmentNames.map((menuDepartment) => (
                <MenuItem
                  key={menuDepartment}
                  onClick={() => handleDepartmentClick(menuDepartment)}
                >
                  {menuDepartment}
                </MenuItem>
              ))}
            </Menu>
            {selectedDepartment === department && (
              <div className="shifts">
                <div className="shift">
                  <div className="shift-label">Morning Shift:</div>
                  <div className="interns">
                    {morningShiftInterns.map((intern) => (
                      <div
                        className="intern"
                        key={intern}
                        onClick={() =>
                          handleMorningShiftAssignment(department, intern)
                        }
                      >
                        {intern}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shift">
                  <div className="shift-label">Afternoon Shift:</div>
                  <div className="interns">
                    {afternoonShiftInterns.map((intern) => (
                      <div
                        className="intern"
                        key={intern}
                        onClick={() =>
                          handleAfternoonShiftAssignment(department, intern)
                        }
                      >
                        {intern}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shift">
                  <div className="shift-label">Assigned Shift:</div>
                  <div className="interns">
                    {getMorningShiftIntern(department) && (
                      <div
                        className="intern"
                        onClick={() =>
                          handleShiftSwap(
                            getMorningShiftIntern(department),
                            "morning"
                          )
                        }
                      >
                        {getMorningShiftIntern(department)}
                      </div>
                    )}
                    {getAfternoonShiftIntern(department) && (
                      <div
                        className="intern"
                        onClick={() =>
                          handleShiftSwap(
                            getAfternoonShiftIntern(department),
                            "afternoon"
                          )
                        }
                      >
                        {getAfternoonShiftIntern(department)}
                      </div>
                    )}
                    {!(getMorningShiftIntern(department) || getAfternoonShiftIntern(department)) && (
                      <div className="empty-shift">No assigned shift</div>
                    )}
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleShiftAssignment(department)}
                >
                  Assign Shift
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
