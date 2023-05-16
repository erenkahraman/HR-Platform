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
          <header className="flex justify-between rounded-t mb-0 px-4 py-6 border-b-2 border-blueGray-300">
            <div className="flex items-center">
              <h1 className="font-roboto font-bold text-4xl text-black text-center w-full">
                Weekly Schedule
              </h1>
            </div>
          </header>

          <section className="flex flex-col items-center justify-center gap-10 mt-4 date-container">
            <table className="font-roboto">
              <tbody>
                <tr>
                  <td>{dateRange}</td>
                </tr>
              </tbody>
            </table>
          </section>

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
                  <td className="button-container">
                    <Button className="move-button">Move to Morning</Button>
                    <Button className="move-button">Move to Afternoon</Button>
                  </td>
                </tr>
                <tr>
                  <td>Soner</td>
                  <td>Backend</td>
                  <td className="button-container">
                    <Button className="move-button">Move to Morning</Button>
                    <Button className="move-button">Move to Afternoon</Button>
                  </td>
                </tr>
                <tr>
                  <td>Natalia</td>
                  <td>Esp</td>
                  <td className="button-container">
                    <Button className="move-button">Move to Morning</Button>
                    <Button className="move-button">Move to Afternoon</Button>
                  </td>
                </tr>
                <tr>
                  <td>Furkan</td>
                  <td>Mobile</td>
                  <td className="button-container">
                    <Button className="move-button">Move to Morning</Button>
                    <Button className="move-button">Move to Afternoon</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

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

</div>
</div>
</section>
);
}
