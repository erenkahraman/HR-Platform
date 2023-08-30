import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu, MenuItem } from "@mui/material";
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
  const csvLinkElement = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleCurrentWeekDateRange();
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get("/api/weeklySchedule", config);
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
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
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const subtractDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };

  const handleCurrentWeekDateRange = () => {
    const currentDate = new Date();
    const todayNameIndex = currentDate.getDay();
    const firstDayOfTheWeek = subtractDays(currentDate, todayNameIndex - 1);
    const formattedFirstDayOfTheWeek = formatDate(firstDayOfTheWeek);
    const lastDayOfTheWeek = addDays(currentDate, WEEKDAYS - todayNameIndex);
    const formattedLastDayOfTheWeek = formatDate(lastDayOfTheWeek);
    const dateRange = `${formattedFirstDayOfTheWeek} - ${formattedLastDayOfTheWeek}`;
    setDateRange(dateRange);
  };

  const handleShiftSwap = (intern1, intern2) => {
    const updatedAssignedShifts = assignedShifts.map((shift) => {
      if (shift.intern === intern1) {
        return { ...shift, intern: intern2 };
      }
      if (shift.intern === intern2) {
        return { ...shift, intern: intern1 };
      }
      return shift;
    });
    setAssignedShifts(updatedAssignedShifts);
  };

  const handleExportToCSV = () => {
    const data = assignedShifts.map((shift) => ({
      Date: shift.date,
      Shift: shift.shift,
      Intern: shift.intern,
    }));
    csvLinkElement.current.link.click();
  };

  return (
    <div>
      <div>
        <h2>Weekly Schedule</h2>
        <p>Date Range: {dateRange}</p>
        <Button
          aria-controls="department-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          endIcon={<ArrowDropDownIcon />}
        >
          {selectedDepartment ? selectedDepartment : "All Departments"}
        </Button>
        <Menu
          id="department-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleDepartmentClick(null)}>
            All Departments
          </MenuItem>
          {departmentNames.map((department) => (
            <MenuItem
              key={department}
              onClick={() => handleDepartmentClick(department)}
            >
              {department}
            </MenuItem>
          ))}
        </Menu>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SystemUpdateAlt />}
          onClick={handleExportToCSV}
        >
          Export to CSV
        </Button>
        <CSVLink
          data={assignedShifts}
          filename={"weekly_schedule.csv"}
          ref={csvLinkElement}
          style={{ display: "none" }}
        >
          Export
        </CSVLink>
      </div>
      {selectedDepartment
        ? Object.entries(weeklySchedule)
            .filter(([department]) => department === selectedDepartment)
            .map(([department, schedule]) => (
              <div key={department}>
                <h3>{department}</h3>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Morning Shift</th>
                        <th>Afternoon Shift</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((item) => (
                        <tr key={item.id}>
                          <td>{item.date}</td>
                          <td>
                            {item.shift === "morning" ? (
                              <div>
                                <span>{item.intern}</span>
                                <SwapHorizIcon
                                  onClick={() =>
                                    handleShiftSwap(
                                      item.intern,
                                      morningShiftInterns[0]
                                    )
                                  }
                                />
                              </div>
                            ) : null}
                          </td>
                          <td>
                            {item.shift === "afternoon" ? (
                              <div>
                                <span>{item.intern}</span>
                                <SwapHorizIcon
                                  onClick={() =>
                                    handleShiftSwap(
                                      item.intern,
                                      afternoonShiftInterns[0]
                                    )
                                  }
                                />
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
        : Object.entries(weeklySchedule).map(([department, schedule]) => (
            <div key={department}>
              <h3>{department}</h3>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Morning Shift</th>
                      <th>Afternoon Shift</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>
                          {item.shift === "morning" ? (
                            <div>
                              <span>{item.intern}</span>
                              <SwapHorizIcon
                                onClick={() =>
                                  handleShiftSwap(
                                    item.intern,
                                    morningShiftInterns[0]
                                  )
                                }
                              />
                            </div>
                          ) : null}
                        </td>
                        <td>
                          {item.shift === "afternoon" ? (
                            <div>
                              <span>{item.intern}</span>
                              <SwapHorizIcon
                                onClick={() =>
                                  handleShiftSwap(
                                    item.intern,
                                    afternoonShiftInterns[0]
                                  )
                                }
                              />
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
    </div>
  );
};

export default WeeklySchedule;
