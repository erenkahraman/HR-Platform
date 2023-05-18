import { UploadFileOutlined, Verified } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import React from "react";

const WeeklySchedule = () => {
  // Generate the date range
  const startDate = "08.05.2023";
  const endDate = "12.05.2023";
  const dateRange = `${startDate} - ${endDate}`;

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: "0px",
    gap: "24px",
    width: "559px",
    height: "24px",
  };

  const buttonStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: "4px 12px",
    gap: "10px",
    width: "145px",
    height: "24px",
    background: "#FFFFFF",
    borderRadius: "10px",
    color: "black",
  };

  const moveButtonStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: "4px 12px",
    gap: "10px",
    width: "145px",
    height: "24px",
    background: "#FFFFFF",
    borderRadius: "10px",
    color: "black",
  };

  const [weeklySchedule,setWeeklySchedule] = useState([])
	const [departmentNames,setDepartmentNames] = useState([])

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
			console.log("this is the front-end part")
			console.log(data);
			
			console.log("if we group them together")
			const weeklyScheduleGroupedByDepartment = data.reduce((departments, item) => {
				const department = (departments[item.department] || []);
				department.push(item);
				departments[item.department] = department;
				return departments;
			  }, {});
			  console.log(weeklyScheduleGroupedByDepartment)
			  setWeeklySchedule(weeklyScheduleGroupedByDepartment)

			const departmentNames = Object.keys(weeklyScheduleGroupedByDepartment);
			setDepartmentNames(departmentNames)
			
		  } catch (e) {
			console.error(e);
		}
		};
		asyncRequest();
	  }, []);

	



  return (
    <section className="relative w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-screen mx-auto"
     
      >
        <div className="relative flex flex-col items-center justify-center min-w-0 break-words w-full rounded ">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full"
             
              >Weekly Schedule</h1>
            </div>
          </div>
          {/* End of Title Container */}
          {/* Date Container */}
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
          {/* End of Date Container */}
          {/* Table */}
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
              <thead>
                <tr>
                  <th>Unassigned Employees</th>  
                </tr>
              </thead>
              <tbody>
  
  {departmentNames.map((eachDepartmentName, index) => (
    <React.Fragment key={index}>
      <tr>
        <td colSpan="3">
          <strong>{eachDepartmentName}:</strong>
        </td>
      </tr>
      {weeklySchedule[eachDepartmentName].map((eachIntern, i) => (
        <tr key={i}>
          <td>{eachIntern.student.firstName + " " + eachIntern.student.lastName}</td>
          <td></td>
          <td>
            <div className="button-container">
              <Button
                className="move-button"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '10px',
                  marginRight: '10px',
                  padding: '5px 20px',
                  margin: '2px 50px',
                }}
              >
                Move to Morning
              </Button>
              <Button
                className="move-button"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '10px',
                  padding: '8px 20px',
                  margin: '0px 5px',
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
