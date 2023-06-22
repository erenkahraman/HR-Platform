import { Button, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
  const ROWS_PER_PAGE = 5;

  const [dateRange, setDateRange] = useState("");
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [morningShiftInterns, setMorningShiftInterns] = useState([]);
  const [afternoonShiftInterns, setAfternoonShiftInterns] = useState([]);
  const [assignedShifts, setAssignedShifts] = useState([]);
  const [page, setPage] = useState(0);

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
        const { data } = await axios.get(`/api/weeklySchedule`, {
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

  const subtractDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };

  const handleCurrentWeekDateRange = () => {
    const currentDate = new Date();
    const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + 1;
    const lastDayOfWeek = firstDayOfWeek + WEEKDAYS - 1;
    const firstDay = new Date(currentDate.setDate(firstDayOfWeek));
    const lastDay = new Date(currentDate.setDate(lastDayOfWeek));
    const dateRange = formatDate(firstDay) + " - " + formatDate(lastDay);
    setDateRange(dateRange);
  };

  const getAssignedInternInfo = (internId) => {
    const assignedShift = assignedShifts.find(
      (shift) => shift.internId === internId
    );
    return assignedShift ? assignedShift.shift : null;
  };

  const handleMoveToMorning = (internId) => {
    const updatedAssignedShifts = assignedShifts.map((shift) => {
      if (shift.internId === internId) {
        return { ...shift, shift: "Morning" };
      }
      return shift;
    });
    setAssignedShifts(updatedAssignedShifts);
  };

  const handleMoveToAfternoon = (internId) => {
    const updatedAssignedShifts = assignedShifts.map((shift) => {
      if (shift.internId === internId) {
        return { ...shift, shift: "Afternoon" };
      }
      return shift;
    });
    setAssignedShifts(updatedAssignedShifts);
  };

  const swapShift = (internId1, internId2) => {
    const updatedAssignedShifts = assignedShifts.map((shift) => {
      if (shift.internId === internId1) {
        return { ...shift, internId: internId2 };
      } else if (shift.internId === internId2) {
        return { ...shift, internId: internId1 };
      }
      return shift;
    });
    setAssignedShifts(updatedAssignedShifts);
  };

  const handleExportToCsv = () => {
    csvLinkElement.current.link.click();
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const internsPerPage = Object.entries(weeklySchedule).slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  return (
    <div>
      <h1>Weekly Schedule</h1>
      <p>Date Range: {dateRange}</p>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Department</TableCell>
              <TableCell>Interns</TableCell>
              <TableCell>Morning</TableCell>
              <TableCell>Afternoon</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {internsPerPage.map(([department, interns]) => (
              <TableRow key={department}>
                <TableCell>{department}</TableCell>
                <TableCell>
                  {interns.map((intern) => (
                    <div key={intern.id}>{intern.name}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {interns.map((intern) => (
                    <div
                      key={intern.id}
                      className={`intern ${
                        getAssignedInternInfo(intern.id) === "Morning"
                          ? "assigned"
                          : ""
                      }`}
                      onClick={() => handleMoveToMorning(intern.id)}
                    >
                      {intern.name}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {interns.map((intern) => (
                    <div
                      key={intern.id}
                      className={`intern ${
                        getAssignedInternInfo(intern.id) === "Afternoon"
                          ? "assigned"
                          : ""
                      }`}
                      onClick={() => handleMoveToAfternoon(intern.id)}
                    >
                      {intern.name}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {interns.length > 1 && (
                    <SwapHorizIcon
                      className="swap-icon"
                      onClick={() =>
                        swapShift(interns[0].id, interns[1].id)
                      }
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <Button
          onClick={(e) => handlePageChange(e, page - 1)}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          onClick={(e) => handlePageChange(e, page + 1)}
          disabled={Object.entries(weeklySchedule).length <= (page + 1) * ROWS_PER_PAGE}
        >
          Next
        </Button>
      </div>
      <Button variant="contained" onClick={handleExportToCsv}>
        Export to CSV
      </Button>
      <CSVLink
        ref={csvLinkElement}
        data={assignedShifts}
        filename={"weekly_schedule.csv"}
      >
        Export
      </CSVLink>
    </div>
  );
};

export default WeeklySchedule;
