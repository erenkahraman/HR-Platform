import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { SystemUpdateAlt } from '@mui/icons-material';
import cookie from 'js-cookie';

const WeeklySchedule = () => {
  const WEEKDAYS = 5;

  const [dateRange, setDateRange] = useState('');
  const [weeklyScheduleByDepartment, setWeeklyScheduleByDepartment] = useState({});
  const [departmentNames, setDepartmentNames] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [morningShiftInterns, setMorningShiftInterns] = useState([]);
  const [afternoonShiftInterns, setAfternoonShiftInterns] = useState([]);
  const [assignedShifts, setAssignedShifts] = useState([]);
  const [availableMorningShiftInterns, setAvailableMorningShiftInterns] = useState([]);
  const [availableAfternoonShiftInterns, setAvailableAfternoonShiftInterns] = useState([]);

  const token = cookie.get('token');

  const csvLinkElement = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorEl && !event.target.closest(`#department-menu-${selectedDepartment}`)) {
        setAnchorEl(null);
        setSelectedDepartment(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
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
    const todayNameIndex = currentDate.getDay();
    const firstDayOfTheWeek = substractDays(currentDate, todayNameIndex - 1);
    const formattedFirstDayOfTheWeek = formatDate(firstDayOfTheWeek);
    const lastDayOfTheWeek = addDays(currentDate, WEEKDAYS - todayNameIndex);
    const formattedLastDayOfTheWeek = formatDate(lastDayOfTheWeek);
    const weekDateRange = `${formattedFirstDayOfTheWeek} - ${formattedLastDayOfTheWeek}`;
    setDateRange(weekDateRange);
  };

  const handleMoveToMorning = async (internToBeMoved) => {
    const updatedMorningShiftInterns = [...morningShiftInterns, internToBeMoved];
    const updatedAfternoonShiftInterns = afternoonShiftInterns.filter(
      (intern) => intern._id !== internToBeMoved._id
    );

    setMorningShiftInterns(updatedMorningShiftInterns);
    setAfternoonShiftInterns(updatedAfternoonShiftInterns);

    const updatedWeeklySchedule = { ...weeklyScheduleByDepartment };
    updatedWeeklySchedule[selectedDepartment] = updatedWeeklySchedule[selectedDepartment].filter(
      (intern) => intern._id !== internToBeMoved._id
    );
    setWeeklyScheduleByDepartment(updatedWeeklySchedule);

    try {
      await axios.put(`/api/weeklySchedule?token=${token}`, {
        params: {
          scheduleGroup: {
            Group: selectedDepartment,
            shift: 'morning',
            internId: internToBeMoved._id,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoveToAfternoon = async (internToBeMoved) => {
    const updatedAfternoonShiftInterns = [
      ...afternoonShiftInterns,
      internToBeMoved,
    ];
    setAfternoonShiftInterns(updatedAfternoonShiftInterns);

    const updatedMorningShiftInterns = morningShiftInterns.filter(
      (intern) => intern._id !== internToBeMoved._id
    );

    setMorningShiftInterns(updatedMorningShiftInterns);

    const updatedWeeklySchedule = { ...weeklyScheduleByDepartment };
    updatedWeeklySchedule[selectedDepartment] = updatedWeeklySchedule[selectedDepartment].filter(
      (intern) => intern._id !== internToBeMoved._id
    );
    setWeeklyScheduleByDepartment(updatedWeeklySchedule);

    try {
      await axios.put(`/api/weeklySchedule?token=${token}`, {
        params: {
          scheduleGroup: {
            Group: selectedDepartment,
            shift: 'afternoon',
            internId: internToBeMoved._id,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleExportToCsv = () => {
    let shiftAssignedInterns = [];
    morningShiftInterns.forEach((morningIntern) => {
      const assignedInternInfo = getAssignedInternInfo(morningIntern, 'Morning');
      shiftAssignedInterns.push(assignedInternInfo);
    });
    afternoonShiftInterns.forEach((afternoonIntern) => {
      const assignedInternInfo = getAssignedInternInfo(afternoonIntern, 'Afternoon');
      shiftAssignedInterns.push(assignedInternInfo);
    });
    setAssignedShifts(shiftAssignedInterns);

    setTimeout(function () {
      csvLinkElement.current.link.click();
    }, 1000);
  };

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        handleCurrentWeekDateRange();

        if (!token) {
          console.log('Token Expired! error function: fetchInterns');
          return;
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            token: token,
          },
        };

        const { data } = await axios.get(`/api/intern`, config);

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
  }, [token]);

  useEffect(() => {
    const fetchInterns2 = async () => {
      try {
        handleCurrentWeekDateRange();

        if (!token) {
          console.log('Token Expired! error function: fetchInterns');
          return;
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            token: token,
          },
        };

        const response = await axios.get(`/api/weeklySchedule`, config);
        const data2 = response.data;

        // Filter out assigned interns
        const morningShiftInternsBefore = data2.populatedWeeklySchedule.map(
          (intern) => intern.Schedule.morning
        );
        const afternoonShiftInternsBefore = data2.populatedWeeklySchedule.map(
          (intern) => intern.Schedule.afternoon
        );
        const morningShiftInterns = morningShiftInternsBefore.flat();
        const afternoonShiftInterns = afternoonShiftInternsBefore.flat();

        setAvailableMorningShiftInterns(morningShiftInterns);
        setAvailableAfternoonShiftInterns(afternoonShiftInterns);
      } catch (e) {
        console.error(e);
      }
    };

    fetchInterns2();
  }, [token]);

  useEffect(() => {
    const fetchWeeklySchedule = async () => {
      try {
        handleCurrentWeekDateRange();

        if (!token) {
          console.log('Token Expired! error function: fetchWeeklySchedule');
          return;
        }

        const response = await axios.get(`/api/weeklySchedule?token=${token}`);
        const { weeklySchedule, populatedWeeklySchedule } = response.data;

        // Update state with the new data
        setMorningShiftInterns(weeklySchedule.morning);
        setAfternoonShiftInterns(weeklySchedule.afternoon);
      } catch (e) {
        console.error(e);
      }
    };

    fetchWeeklySchedule();
  }, [token]);

  const swapShift = (internToBeSwapped, shiftTime) => {
    if (shiftTime === 'morning') {
      handleMoveToAfternoon(internToBeSwapped);
    } else if (shiftTime === 'afternoon') {
      handleMoveToMorning(internToBeSwapped);
    } else {
      console.log('There is something wrong I can feel it');
    }
  };

  const getAssignedInternInfo = (intern, shiftTime) => {
    const assignedIntern = {
      'First Name': intern.student.firstName,
      'Last Name': intern.student.lastName,
      Department: intern.department,
      Shift: shiftTime,
    };
    return assignedIntern;
  };

  return (
    <div className="min-h-screen">
      <div className="container w-full flex-grow mx-auto">
        {/* Your JSX content goes here */}
      </div>
    </div>
  );
};

export default WeeklySchedule;
