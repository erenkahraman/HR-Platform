import {
  Backdrop,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { confirmAlert } from "react-confirm-alert";
import SaveIcon from "@mui/icons-material/Save";
import "react-confirm-alert/src/react-confirm-alert.css";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; //if you want to use something cool :)
import { useState, useEffect } from "react";
import reactSelect from "react-select";
import { CheckCircle } from "@mui/icons-material";
import EditAttendance from "../../components/Modal/EditAttendance";
import axios from "axios";
import cookie from "js-cookie";
import useTableSearch from "../../hooks/useTableSearch";
import InfoIcon from '@mui/icons-material/Info';
import { CSVLink } from "react-csv";
import React, { useRef } from 'react';
import { Button, Grid } from "@mui/material";
import { Add, SystemUpdateAlt } from "@mui/icons-material";
import { format, startOfMonth, endOfMonth } from "date-fns";
import RefreshIcon from '@mui/icons-material/Refresh';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";


function Attendence() {
  var today = new Date();

  //  const notify =() => toast ("Please check if everything before saving!");
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [date, setDate] = useState(today.toISOString().split('T')[0])
  const [status, setStatus] = useState("present");
  const [intern, setIntern] = useState();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertIncludedDate, setOpenAlertIncludedDate] = useState(false);
  const [editAttendanceModel, setAttendanceEditModel] = useState(false);
  const [dateIncluded, setDateIncluded] = useState(false);
  const token = cookie.get("token");
  const [dateRange, setDateRange] = useState("");
  const currentDate = new Date();
  
  


  const csvLinkElement = useRef();
  const csvLinkSingleStudent = useRef();


    

  const [searchedVal, setSearchedVal] = useState("");
  const { filteredData } = useTableSearch({ data, searchedVal });
  console.log(filteredData)

  const [draftedInternUpdates, setDraftedInternUpdates] = useState([])
  const [updatedInterns, setUpdatedInterns] = useState([])

  const [singleStudentAttendanceInfo, setSingleStudentAttendanceInfo] = useState([])
  const [allStudentsAttendanceInfo, setAllStudentsAttendanceInfo] = useState([])

  const [showAlert, setShowAlert] = useState(false);
  const [cancelRefresh, setCancelRefresh] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  



  const listHeaders = [
    "Full Name",
    "Department",
    "Position",
    "Present",
    "Late",
    "Covered Day",
    "Day Off",
    "Excused Leave",
    "Sick",
    "Unexcused Leave",
    "Action",
  ];


  const handleRefreshTable = () => {
    setShowConfirmation(true);
  };

  const handleConfirmRefresh = () => {
    setRefreshing(true);
  
    const refreshedData = data.map((student) => ({
      ...student,
      intern: {
        ...student.intern,
        attendance: {
          present: {
            count: 0,
            dates: [],
          },
          late: {
            count: 0,
            dates: [],
          },
          coveredDay: {
            count: 0,
            dates: [],
          },
          dayOff: {
            count: 0,
            dates: [],
          },
          excusedLeave: {
            count: 0,
            dates: [],
          },
          sick: {
            count: 0,
            dates: [],
          },
          unexcusedleave: {
            count: 0,
            dates: [],
          },
        },
      },
    }));
  
    setData(refreshedData);
  };

  const handleCancelRefresh = () => {
    setOpen(false);
    setShowAlert(false);
    setCancelRefresh(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/intern');
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  
  


  const handleChangeStatus = (student, newStatus) => {


    const isDateGiven = date !== ""

    if (!isDateGiven) {
      return;
    }

    const updatedIntern = student.intern

    const draftedInternUpdate = {
      id: updatedIntern._id,
      status: newStatus,
      count: updatedIntern.attendance[newStatus].count + 1,
      date: date
    }

    let isStatusChanged = false
    const newDraftedInternUpdates = draftedInternUpdates.map((eachDraftedIntern) => {
      isStatusChanged = eachDraftedIntern._id === draftedInternUpdate.id
      if (isStatusChanged) return draftedInternUpdate
      else return eachDraftedIntern
    })


    if (isStatusChanged) {
      setDraftedInternUpdates(newDraftedInternUpdates)
    } else {
      setDraftedInternUpdates([...draftedInternUpdates, updatedIntern])
      setUpdatedInterns([...updatedInterns, updatedIntern])
    }

    setStatus(newStatus)
  }
  useEffect(() => {
    setLoading(true);
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          "/api/intern",
          { params: { token: token } },
          config
        );
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    asyncRequest();
  }, []);

  useEffect(() => {
    const handleCurrentMonthDateRange = () => {
      const firstDayOfMonth = startOfMonth(currentDate);
      const lastDayOfMonth = endOfMonth(currentDate);
      const formattedFirstDay = format(firstDayOfMonth, "dd/MM/yyyy");
      const formattedLastDay = format(lastDayOfMonth, "dd/MM/yyyy");
      const monthDateRange = `${formattedFirstDay} - ${formattedLastDay}`;
      setDateRange(monthDateRange);
    };

    handleCurrentMonthDateRange();
  }, [currentDate]);

  const csvReport = {
    separator: "  ",
    data: data,
    listHeaders: listHeaders,
    filename: "Extramus Attendance List",
  };

  const handleExportJsonDataToCsv = () => {

    let studentsAttendanceInfo = []
    data.forEach((eachStudent) => {

      const attendanceInfo = getAttendanceInfoOfStudent(eachStudent)
      studentsAttendanceInfo.push(attendanceInfo)
    })

    setAllStudentsAttendanceInfo(studentsAttendanceInfo)

    const downloadedCsvFile = setTimeout(function () {
      csvLinkElement.current.link.click()
    }, 1000);
  }


  const getAttendanceInfoOfStudent = (student) => {

    const attendanceInfo = {
      "First Name": student.firstName,
      "Last Name": student.lastName,
      "Covered Day": student.intern.attendance.coveredDay.count,
      "Day Off": student.intern.attendance.dayOff.count,
      "Excused Leave": student.intern.attendance.excusedLeave.count,
      "Late": student.intern.attendance.late.count,
      "Present": student.intern.attendance.present.count,
      "Sick": student.intern.attendance.sick.count,
      "Unexcused Leave": student.intern.attendance.unexcusedleave.count,
    }
    return attendanceInfo
  }
  const handleExportSingleInternAttendanceToCsv = (student) => {

    if (event.target.tagName === "A") {
      return
    }

    const attendanceInfo = getAttendanceInfoOfStudent(student)

    setSingleStudentAttendanceInfo([attendanceInfo])

    const downloadedCsvFile = setTimeout(function () {
      csvLinkSingleStudent.current.link.click()
    }, 1000);

  }



  const save = (intern) => {
    setOpenAlert(false);
    setOpenAlertIncludedDate(false);
    setIntern(intern);
    if (!dateIncluded) {
      if (status && date) {
        setOpen(false);
        confirmAlert({
          message: "Are you sure you want to save ?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                setOpen(true);
                intern.attendance[status].count++;
                intern.attendance[status].dates.push(date);
                intern.token = token;
                const JSONintern = JSON.stringify(intern);
                const endpoint = `/api/intern/${intern._id}`;
                const options = {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",

                  },

                  body: JSONintern,
                };
                await fetch(endpoint, options);
                setOpen(false);
              },
            },
            {
              label: "No",
            },
          ],
        });
        setStatus("present");
        setDate(today);
      } else {
        setOpenAlert(true);
      }
    } else setOpenAlertIncludedDate(true);
  };
  const clicked = () => {
    setAttendanceEditModel(true);
  };

  const saveAll = () => {



    setLoading(true);
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        // PUT request to update all interns in the database
        await axios.put(`/api/intern`, { token: token, interns: updatedInterns, drafted: draftedInternUpdates }, config);
        setLoading(false);
        // Show a success message to the user
        alert("All changes have been saved!");
        window.location.reload()
      } catch (e) {
        console.error(e);
        setLoading(false);
        // Show an error message to the user
        alert("An error occurred while saving the changes. Please try again later.");
      }
    };
    asyncRequest();
  };

  const checkForAttendanceChanges = () => {
    const interns = data;
    const changedInterns = [];
    interns.forEach(intern => {
      const dayOffCount = intern.attendance.dayOff.dates ? intern.attendance.dayOff.dates.length : 0;
      const coveredDayCount = intern.attendance.coveredDay ? intern.attendance.coveredDay.dates.length : 0;
      if (dayOff !== coveredDay)
        changedInterns.push(intern);
    });
    if (changedInterns.length > 0) {
      alert("Covered Days and Day Offs are not equal for some interns. Please check before saving!");
    }
  };







  const disableStatus = (intern, dt) => {
    if (
      intern.attendance.present.dates.includes(dt) ||
      intern.attendance.late.dates.includes(dt) ||
      intern.attendance.dayOff.dates.includes(dt) ||
      intern.attendance.excusedLeave.dates.includes(dt) ||
      intern.attendance.sick.dates.includes(dt) ||
      intern.attendance.unexcusedleave.dates.includes(dt) ||
      intern.attendance.coveredDay.dates.includes(dt)
    )
      setDateIncluded(true);
    else setDateIncluded(false);
  };

  if (isloading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  if (!data) return <p>No profile data</p>;


  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  console.log(today);

  // function setDefaultStatus() {
  //   const selectElement = document.getElementById("country");
  //   selectElement.value = "present";
  // }

  function setDefaultSituation() {
    const selectElement = document.getElementById("situation");
    selectElement.value = "Present";
  }

  return (
    <section className="relative w-full">

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="w-full mb-12">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          <form>
            <label
              htmlFor="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>

          </form>
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white flex-col md:flex-row">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">Intern Attendance ({dateRange})</h3>
              </div>
            </div>

            <div className="flex gap-2 flex-col md:flex-row">

            <Button
        size="medium"
        color="primary"
        startIcon={<RefreshIcon className="text-sm" />}
        variant="contained"
        sx={{ borderRadius: 2 }}
        onClick={handleRefreshTable}
      >
        Refresh Table
      </Button>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmation}
        onClose={handleCancelRefresh}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Refresh</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to refresh the table? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRefresh} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmRefresh} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

              

              <Button
                size="medium"
                color="primary"
                startIcon={<SystemUpdateAlt className="text-sm" />}
                variant="contained"
                sx={{ borderRadius: 2 }}
                href="#"
                onClick={handleExportJsonDataToCsv}
              >
                Export to CSV
              </Button>
              <CSVLink ref={csvLinkElement} data={allStudentsAttendanceInfo}></CSVLink>

              <form>
                <label
                  htmlFor="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearchedVal(e.target.value);
                    }}
                  />
                </div>
              </form>
              <div className="relative"  >
                
                <Button
                size="medium"
                color="primary"
                startIcon= {<CheckCircle className="text-sm" />}
                variant="contained"
                sx={{ borderRadius: 2 }}
                href="#"
                onClick={saveAll}
              >
                Save All
              </Button>
                
              </div>
            </div>
          </div>
          <Collapse in={openAlert}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Choose Date/Status for the student !
            </Alert>
          </Collapse>
          <Collapse in={openAlertIncludedDate}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlertIncludedDate(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Status already set for the select date !
            </Alert>
          </Collapse>
          {/* Table */}
          <div className="block w-full overflow-x-auto ">
            <table className="items-center w-full border-collapse bg-white">
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    INTERN
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    DATE
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    SITUATION
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    PRESENT
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    LATE
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Covered Day
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    DAY OFF
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    EXCUSED LEAVE
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    SICK
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    UNEXCUSED LEAVE
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    ACTION
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y">
                {data.length == 0 ? (
                  <tr className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    The interns list is empty
                  </tr>
                ) : (
                  filteredData.map((student) => (
                    <tr key={student.intern._id}>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center mt-3">
                        <div className="font-bold">
                          {" "}
                          {student.firstName} {student.lastName}
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <input
                          type="date"
                          defaultValue={date}
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value);
                            console.log(date);

                          }}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"

                          onClick={(e) => {
                            setDate(e.target.value);

                            console.log(date);


                          }}
                        ></input>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <select
                          id="country"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          // onClick={(e) => setStatus(e.target.value)}
                          onClick={(e) => handleChangeStatus(student, e.target.value)}
                        >
                          <option value="present">Present</option>
                          <option value="late">Late</option>
                          <option value="dayOff">Day off</option>
                          <option value="coveredDay">Covered Day</option>
                          <option value="excusedLeave">Excused leave</option>
                          <option value="sick">Sick</option>
                          <option value="unexcusedleave">
                            Unexecused leave
                          </option>
                        </select>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{student.intern.attendance.present.dates.filter(date => +date.split("-")[1] === (new Date().getMonth() + 1) && +date.split("-")[0] === new Date().getFullYear()).length}</div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">

                          <div>{student.intern.attendance.late.dates.filter(date => +date.split("-")[1] === (new Date().getMonth() + 1) && +date.split("-")[0] === new Date().getFullYear()).length}</div>

                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{student.intern.attendance.coveredDay.dates.filter(date => +date.split("-")[1] === (new Date().getMonth() + 1) && +date.split("-")[0] === new Date().getFullYear()).length}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{student.intern.attendance.dayOff.dates.filter(date => +date.split("-")[1] === (new Date().getMonth() + 1) && +date.split("-")[0] === new Date().getFullYear()).length}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>
                            {student.intern.attendance.excusedLeave.dates.filter(date => +date.split("-")[1] === (new Date().getMonth() + 1) && +date.split("-")[0] === new Date().getFullYear()).length}
                          </div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{student.intern.attendance.sick.dates.filter(date => +date.split("-")[1] === (new Date().getMonth() + 1) && +date.split("-")[0] === new Date().getFullYear()).length}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>
                            {student.intern.attendance.unexcusedleave.dates.filter(date => +date.split("-")[1] === (new Date().getMonth() + 1) && +date.split("-")[0] === new Date().getFullYear()).length}
                          </div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-r">
                            <div>
                              <button
                                onClick={() => save(student.intern)}
                                title="Save"
                              >
                                <CheckCircle className="h-6 fill-[#0b3768] hover:fill-[#15803d]" />
                              </button>
                            </div>
                            <button title="Details">
                              <InfoIcon
                                className="h-6 fill-[#0b3768] hover:fill-[#15803d]"
                                onClick={(e) =>
                                  setAttendanceEditModel(student.intern._id)
                                }

                              />
                              {editAttendanceModel === student.intern._id && (
                                <EditAttendance
                                  intern={student.intern}
                                  setModel={setAttendanceEditModel}
                                />
                              )}
                            </button>
                            <button title="Export to CSV" onClick={() => handleExportSingleInternAttendanceToCsv(student)}>
                              <SystemUpdateAlt className="h-6 fill-[#0b3768] hover:fill-[#15803d]" />
                              <CSVLink ref={csvLinkSingleStudent} data={singleStudentAttendanceInfo}></CSVLink>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Attendence;