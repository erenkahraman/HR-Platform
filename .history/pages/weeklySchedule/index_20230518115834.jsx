import { Button, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import cookie from "js-cookie";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Sidebar } from "flowbite-react";

const WeeklySchedule = () => {
  const startDate = "08.05.2023";
  const endDate = "12.05.2023";
  const dateRange = `${startDate} - ${endDate}`;

  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const token = cookie.get("token");

  useEffect(() => {
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/weeklySchedule`,
          { params: { token: token } },
          config
        );
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

  return (
    <div className="min-h-screen  ">
      <div className="container w-full flex-grow  mx-auto">
        <div className=" flex w-full flex-col   items-center justify-center min-w-0 break-words w-full rounded">
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">
                Weekly Schedule
              </h1>
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
                {departmentNames.map((eachDepartmentName, ) => (
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
          
          {/* Morning Shift People*/}
          <div className="flex flex-col items-center justify-center gap-10 mt-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              margin : "12px 24px",
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
                  <thead>
                    <tr>
                      <th>Morning Shift</th>
                    </tr>
                  </thead>
                </tbody>
              </table>

            <table
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
                  <th>UEX</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>Eren</td>
                <td>Kahraman</td>
                <td>
                <div className="button-container" style={{  marginRight: "90px", paddingRight: "200px" }}>
                                
                                <Button
                                  className="move-button"
                                  style={{
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: "10px",
                                    padding: "8px 20px",
                                    margin: "0px 700px",
                                  }}
                                >
                                  Swap Shift
                                </Button>
                              </div>
                </td>
              </tr>
              <tr>
                <td>Soner</td>
                <td>Backend</td>
                <td>
                <div className="button-container"  style={{   marginRight: "2000px", paddingRight: "600px" }}>
                                
                                <Button
                                  className="move-button"
                                  style={{
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: "10px",
                                    padding: "8px 20px",
                                    margin: "0px 700px",
                                  }}
                                >
                                Swap Shift
                                </Button>
                              </div>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
          {/* End of Morning Shift People */}
          {/* Afternoon Shift People*/}
          <div className="flex flex-col items-center justify-center gap-10 mt-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin : "12px 26px",
              padding: "12px 26px",
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
                <thead>
                  <tr>
                    <th>Afternoon Shift</th>
                  </tr>
                </thead>
              </tbody>
            </table>

            <table
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
                  <th>DIGITAL MARKETING</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>Eren</td>
                <td>Kahraman</td>
              </tr>
              <tr>
                <td>Soner</td>
                <td>Backend</td>
              </tr>

              </tbody>
            </table>
          </div>

          
      </div>
    </div>
  );
            
}

export default WeeklySchedule;