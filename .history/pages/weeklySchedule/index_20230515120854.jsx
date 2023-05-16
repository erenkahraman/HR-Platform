import { Button } from "@mui/material";
import React from "react";

export default function WeeklySchedule() {
  const startDate = "08.05.2023";
  const endDate = "12.05.2023";
  const dateRange = `${startDate} - ${endDate}`;

  return (
    <section className="relative w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-screen mx-auto">
        <div className="relative flex flex-col items-center justify-center min-w-0 break-words w-full rounded">
          {/* Title Container */}
          <header className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">
                Weekly Schedule
              </h1>
            </div>
          </header>
          {/* End of Title Container */}
          {/* Date Container */}
          <section className="flex flex-col items-center justify-center gap-10 mt-4 date-container">
            <table className="font-roboto">
              <tbody>
                <tr>
                  <td>{dateRange}</td>
                </tr>
              </tbody>
            </table>
          </section>
          {/* End of Date Container */}
          {/* Table */}
          <section className="flex flex-col items-center justify-center gap-10 mt-4 table-container">
            <table className="font-roboto">
              <thead>
                <tr>
                  <th>Unassigned Employees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Eren</td>
                  <td>Kahraman</td>
                  <td>
                    <div className="button-container">
                      <Button className="move-button">Move to Morning</Button>
                      <Button className="move-button">Move to Afternoon</Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Soner</td>
                  <td>Backend</td>
                  <td>
                    <div className="button-container">
                      <Button className="move-button">Move to Morning</Button>
                      <Button className="move-button">Move to Afternoon</Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Natalia</td>
                  <td>Esp</td>
                  <td>
                    <div className="button-container">
                      <Button className="move-button">Move to Morning</Button>
                      <Button className="move-button">Move to Afternoon</Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Furkan</td>
                  <td>Mobile</td>
                  <td>
                    <div className="button-container">
                      <Button className="move-button">Move to Morning</Button>
                      <Button className="move-button">Move to Afternoon</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          {/* End of Table */}
          {/* Morning Shift People*/}
          <section className="flex flex-col items-center justify-center gap-10 mt-4 shift-container">
            <table className="font-roboto">
              <thead>
                <tr>
                  <th>Morning Shift</th>
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
          </section>
          {/* End of Morning Shift People */}
          {/* Afternoon Shift People*/}
          <section className="flex flex-col items-center justify-center gap-10 mt-4 shift-container">
            <table className="font-roboto">
              <thead>
                <tr>
                  <th>Afternoon Shift</th>
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
          </section>
          {/* End of Afternoon Shift People */}
        </div>
      </div>
    </section>
  );
}
