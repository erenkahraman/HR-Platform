import React from "react";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { confirmAlert } from "react-confirm-alert";
import { Backdrop, CircularProgress } from "@mui/material";
import cookie from "js-cookie";
import moment from "moment";


const EditAttendance = ({ attendance, setModel }) => {
  const [dates, setDates] = useState([]);
  const [status, setStatus] = useState("present");
  const [open, setOpen] = useState(false);
  const token = cookie.get("token");

  let today = new Date();
  let date =
    today.getDate() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getFullYear();


  

  const updateAttendance = () => {
    confirmAlert({
      message:
        'Do you want to decrease one the status:' + status,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setOpen(true);
            attendance[status].count--;
            attendance.token = token;
            const JSONattendance = JSON.stringify(attendance);
            const endpoint = `/api/attendance/${attendance._id}`;
            const options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSONattendance,
            };
            await fetch(endpoint, options);
            setOpen(false);
            setModel(undefined);
          },
          
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form className="flex flex-col gap-4">
        <div className=" bg-zinc-200 opacity-90 fixed inset-0 z-50  ">
          <div className="flex h-screen justify-center items-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Attendance for {attendance.internTest.student.firstName}{" "}
                  {attendance.internTest.student.lastName}
                </h3>
              </div>

              <div className="p-6 space-y-6 flex-nowrap ">
                <div className="flex  flex-row">
                  <label
                    htmlFor="startDate"
                    className="basis-1/2 flex items-center text-left text-xl font-semibold text-black w-32 "
                  >
                    Status:
                  </label>
                  <select
                    id="country"
                    className="basis-1/2 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onClick={(e) => {
                      if (e.target.value) {
                        debugger;
                        setStatus(e.target.value);
                        setDates(attendance[e.target.value].date);
                      } else {
                        setDates([]);
                      }
                    }}
                  >
                    <option value="">Select...</option>
                    <option value="late">Late</option>
                    <option value="dayOff">Day off</option>
                    <option value="coveredDay">Covered Day</option>
                    <option value="excusedLeave">Excused leave</option>
                    <option value="sick">Sick</option>
                    <option value="unexcusedLeave">Unexecused leave</option>
                  </select>
                </div>
                <div className="flex flex-row">
                  <label
                    htmlFor="startDate"
                    className="basis-1/2 flex  items-center text-left text-xl font-semibold text-black w-32 "
                  >
                    Date
                  </label>
                  <th className="overflow-y-auto max-h-32 w-2/5 mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
                    {dates.map((date, index) => (
                      <React.Fragment key={attendance._id}>
                        <tr className="flex items-center space-x-3">
                          <label>{date}</label>
                        </tr>
                        {(index + 1) % 2 === 0 && <br />} 
                      </React.Fragment>
                    ))}
                  </th>
                </div>
              </div>
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent"
                  onClick={(e) => {
                    setModel(undefined);
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent 
                            text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 
                            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                            focus:ring-blue-500"
                  onClick={(e) => {
                    updateAttendance(attendance);
                    
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}; 

export default EditAttendance;
