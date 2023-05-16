import { Button } from "@mui/material";
import React from "react";

export default function WeeklySchedule() {
  const ShiftDetails = ({ title, department, employees }) => (
    <div className="flex flex-col items-center justify-center gap-10 mt-4">
      <table className="font-roboto w-full max-w-screen mx-auto">
        <thead>
          <tr>
            <th>{title}</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.name}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>
                <div className="button-container">
                  <Button className="move-button">Move to Morning</Button>
                  <Button className="move-button">Move to Afternoon</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const unassignedEmployees = [
    { name: "Eren", department: "Kahraman" },
    { name: "Soner", department: "Backend" },
    { name: "Natalia", department: "Esp" },
    { name: "Furkan", department: "Mobile" },
  ];

  const morningShiftEmployees = [
    { name: "Eren", department: "Kahraman" },
    { name: "Soner", department: "Backend" },
  ];

  const afternoonShiftEmployees = [
    { name: "Eren", department: "Kahraman" },
    { name: "Soner", department: "Backend" },
  ];

  const dateRange = "Monday, 20 September - Sunday, 26 September";

  

  return (
    <section className="relative w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-screen mx-auto">
        <div className="relative flex flex-col items-center justify-center min-w-0 break-words w-full rounded">
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">
                Weekly Schedule
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-10 mt-4">
            <table className="font-roboto">
              <tbody>
                <tr>
                  <td>{dateRange}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ShiftDetails
            title="Unassigned Employees"
            employees={unassignedEmployees}
          />

          <ShiftDetails
            title="Morning Shift"
            employees={morningShiftEmployees}
          />

          <ShiftDetails
            title="Afternoon Shift"
            employees={afternoonShiftEmployees}
          />
        </div>
      </div>
    </section>
  );
}
