import { Button, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import cookie from "js-cookie";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const WeeklySchedule = () => {
  const startDate = "08.05.2023";
  const endDate = "12.05.2023";
  const dateRange = `${startDate} - ${endDate}`;

  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const handleDepartmentClick = (departmentName) => {
    setSelectedDepartment(departmentName);
  };
  
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <section className="relative w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-screen mx-auto">
        {/* Title Container */}
        <div className="relative flex flex-col items-center justify-center min-w-0 break-words w-full rounded">
          {/* ... */}
        </div>
        {/* End of Title Container */}
        {/* Date Container */}
        <div className="flex flex-col items-center justify-center gap-10 mt-4">
          {/* ... */}
        </div>
        {/* End of Date Container */}
        {/* Table */}
        <div className="flex flex-col items-center justify-center gap-10 mt-4">
          <table className="font-roboto" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>INTERNS</th>
              </tr>
            </thead>
            <tbody>
              {departmentNames.map((departmentName) => (
                <React.Fragment key={departmentName}>
                  <tr>
                    <td colSpan="3">
                      <Button
                        onClick={() => handleDepartmentClick(departmentName)}
                        endIcon={<ArrowDropDownIcon />}
                        data-department={departmentName}
                        style={{
                          backgroundColor:
                            selectedDepartment === departmentName
                              ? "#DCEBFC"
                              : "white",
                        }}
                      >
                        {departmentName}
                      </Button>
                    </td>
                  </tr>
                  {selectedDepartment === departmentName &&
                    weeklySchedule[departmentName]?.map((intern) => (
                      <tr key={intern.id}>
                        <td>{`${intern.student.firstName} ${intern.student.lastName}`}</td>
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
                </React.Fragment>
              ))}
            </tbody>
          </table>
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
              </tr>
              <tr>
                <td>Soner</td>
                <td>Backend</td>
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
              margin : "12px 24px",
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
    </section>
  );
}

export default WeeklySchedule;
