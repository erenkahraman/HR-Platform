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
import { useState, useEffect } from "react";
import reactSelect from "react-select";
import { CheckCircle } from "@mui/icons-material";
import EditAttendance from "../../components/Modal/EditAttendance";
import axios from "axios";
import cookie from "js-cookie";
import useTableSearch from "../../hooks/useTableSearch";
import InfoIcon from "@mui/icons-material/Info";
import { CSVLink } from "react-csv";
import React, { useRef } from "react";
import { Button, Grid } from "@mui/material";
import { Add, SystemUpdateAlt } from "@mui/icons-material";
import { format, startOfMonth, endOfMonth,addMonths, subMonths } from "date-fns";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import mongoose from "mongoose";
import { de } from "date-fns/locale";



function Attendence() {
  var today = new Date();

  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [date, setDate] = useState(today.toISOString().split("T")[0]);
  const [status, setStatus] = useState("present");
  const [internTest, setInterns] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertIncludedDate, setOpenAlertIncludedDate] = useState(false);
  const [editAttendanceModel, setAttendanceEditModel] = useState(false);
  const [dateIncluded, setDateIncluded] = useState(false);
  const token = cookie.get("token");
  const [dateRange, setDateRange] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);

  const csvLinkElement = useRef();
  const csvLinkSingleIntern = useRef();

  const [searchedVal, setSearchedVal] = useState("");
  const { filteredData } = useTableSearch({ data, searchedVal });
  console.log(data);
  console.log(filteredData);

  const [draftedInternUpdates, setDraftedInternUpdates] = useState([]);
  const [updatedInterns, setUpdatedInterns] = useState([]);

  const [singleInternAttendanceInfo, setsingleInternAttendanceInfo] =
    useState([]);
  const [allInternsAttendanceInfo, setAllInternsAttendanceInfo] =
    useState([]);

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

  const handleCancelRefresh = () => {
    setShowConfirmation(false);
  };


  const saveToAttendanceDatabase = async (attendanceData) => {
    try {
      const internTest=attendanceData.internTest
      const attendance=attendanceData

      // const internId = new mongoose.Types.ObjectId();
      const attendanceId = new mongoose.Types.ObjectId();

      // internTest._id = internId;
      internTest.attendance=attendanceId;

      attendanceData._id = attendanceId
      attendance.internTest=internTest._id;

      attendanceData.token=token
      internTest.token=token
      await axios.post(`/api/attendance?token=${token}`, attendanceData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Veriler basariyla sunucuya gönderildi!");
      }
      catch (error) {
      console.error("Hata: Veriler sunucuya gönderilemedi.", error);
    }
  };


  const handleChangeStatus = (attendance, newStatus) => {

    debugger;
    const isDateGiven = date !== ""

    if (!isDateGiven) {
      return;
    }

    const updatedIntern = attendance.internTest

    const draftedInternUpdate = {
      id: updatedIntern._id,
      status: newStatus,
      count: attendance[newStatus] + 1,
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
    // Fetch student list from the API
    const fetchInterns = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.get(
          `/api/internTest`,
          { params: { token: token } },
          config
        ); 
        setInterns(response.data);
      } catch (error) {
        console.error('Error fetching interns:', error);
      }
    };
    fetchInterns();
  }, [token]);


  const asyncRequest = async (newDate) => {
    try {
      const token = cookie.get("token");
      console.log(token);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        "/api/attendance",
        { params: { token: token } },
        config
      );
      const filteredData = data.filter((attendance) => {
        const attendanceDate = new Date(attendance.date); 
        const attendanceMonth = attendanceDate.getMonth() + 1; 
        return attendanceMonth === newDate.getMonth() + 1; 
      });
      setData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    asyncRequest(currentDate);
  }, [token]);



  

  const handleCurrentMonthDateRange = (date) => {
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    const formattedFirstDay = format(firstDayOfMonth, "dd/MM/yyyy");
    const formattedLastDay = format(lastDayOfMonth, "dd/MM/yyyy");
    const monthDateRange = `${formattedFirstDay} - ${formattedLastDay}`;
    setDateRange(monthDateRange);
  };

  useEffect(() => {
    handleCurrentMonthDateRange(currentDate);
  }, [currentDate]);

  const handleNextMonth = async () => {
    var newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);

    await asyncRequest(newDate);
  };

  const handlePreviousMonth = async () => {
    var newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    await asyncRequest(newDate);
  };

  // useEffect(() => {
  //   const handleCurrentMonthDateRange = () => {
  //     const firstDayOfMonth = startOfMonth(currentDate);
  //     const lastDayOfMonth = endOfMonth(currentDate);
  //     const formattedFirstDay = format(firstDayOfMonth, "dd/MM/yyyy");
  //     const formattedLastDay = format(lastDayOfMonth, "dd/MM/yyyy");
  //     const monthDateRange = `${formattedFirstDay} - ${formattedLastDay}`;
  //     setDateRange(monthDateRange);
  //   };

  //   handleCurrentMonthDateRange();
  // }, [currentDate]);

  const csvReport = {
    separator: "  ",
    data: data,
    listHeaders: listHeaders,
    filename: "Extramus Attendance List",
  };

  const handleExportJsonDataToCsv = () => {

    let internsAttendanceInfo = []
    data.forEach((attendance) => {
      debugger;
      const attendanceInfo = getAttendanceInfoOfIntern(attendance)
      internsAttendanceInfo.push(attendanceInfo)
    })

    setAllInternsAttendanceInfo(internsAttendanceInfo)

    const downloadedCsvFile = setTimeout(function () {
      csvLinkElement.current.link.click()
    }, 1000);
  }


  const getAttendanceInfoOfIntern = (attendance) => {
    debugger;
    const attendanceInfo = {
      "First Name": attendance.internTest.student.firstName,
      "Last Name": attendance.internTest.student.lastName,
      "Covered Day": attendance.coveredDay,
      "Day Off": attendance.dayOff,
      "Excused Leave": attendance.excusedLeave,
      "Late": attendance.late,
      "Present": attendance.present,
      "Sick": attendance.sick, 
      "Unexcused Leave": attendance.unexcusedleave,
    }
    return attendanceInfo
  }
  const handleExportSingleInternAttendanceToCsv = (attendance) => {

    const attendanceInfo = getAttendanceInfoOfIntern(attendance)

    setsingleInternAttendanceInfo([attendanceInfo])

    const downloadedCsvFile = setTimeout(function () {
      csvLinkSingleIntern.current.link.click()
    }, 1000);

  }
  const moveToNextMonth = async () => {
        confirmAlert({
          message: "Are you sure you want to save ?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                var newDate = addMonths(currentDate, 1);
                // setCurrentDate(newDate);
                setOpen(true);
                for (const attendance of data) {
                  const attendanceData = {
                    present: 0,
                    late: 0,
                    coveredDay: 0,
                    dayOff: 0,
                    excusedLeave: 0,
                    sick: 0,
                    unexcusedleave: 0,
                    date: newDate,
                    internTest: attendance.internTest,
                  };
              
                  
                  await saveToAttendanceDatabase(attendanceData);
                  debugger;

                }
                setData(data);
                setInterns(data.internTest);
                setDraftedInternUpdates(data);
                setUpdatedInterns(data);
                setShowConfirmation(false);
                setOpen(false);
              },
            },
            {
              label: "No",
            },
          ],
        });
  };


  const save = (attendance) => {
    debugger;
    setInterns(attendance.internTest);
    if (!dateIncluded) {
      if (status && date) {
        confirmAlert({
          message: "Are you sure you want to save ?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                debugger;
                setOpen(true);
                attendance[status]++;
                attendance.date=date;
                attendance.internTest.token = token;
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
        await axios.put(`/api/internTest`, { token: token, internTests: updatedInterns, drafted: draftedInternUpdates }, config);
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
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>

          </form>
          {/* Title Container */}

            <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white flex-col md:flex-row">

                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-2xl">Intern Attendance  </h3>
                    </div>
                    <button className="prev-btn text-2xl" onClick={handlePreviousMonth}>
                      &lt;
                    </button>
                    <h3 className="text-lg font-semibold mx-4">{dateRange}</h3>
                    <button className="next-btn text-2xl" onClick={handleNextMonth}>
                      &gt;
                    </button>
                  </div>

            <div className="flex gap-2 flex-col md:flex-row">
            <Button
            size="medium"
            color="primary"
            variant="contained"
            sx={{ borderRadius: 2 }}
            href="#"
            onClick={moveToNextMonth}
          >
            Move To Next Month
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
              {/* <DialogActions>
                <Button onClick={handleCancelRefresh} color="primary">
                  No
                </Button>
                <Button onClick={handleConfirmRefresh} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions> */}
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
              <CSVLink ref={csvLinkElement} data={allInternsAttendanceInfo}></CSVLink>

              <form>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearchedVal(e.target.value);
                    }}
                  />
                </div>
              </form>
              <div className="relative"  >
                
                {/* <Button
                size="medium"
                color="primary"
                startIcon= {<CheckCircle className="text-sm" />}
                variant="contained"
                sx={{ borderRadius: 2 }}
                href="#"
                onClick={saveAll}
              >
                Save All
              </Button> */}
                
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
                  filteredData.map((attendance) => (
                    <tr key={attendance._id}>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center mt-3">
                        <div className="font-bold">
                          {" "}
                          {attendance.internTest.student.firstName} {attendance.internTest.student.lastName}
                        </div>
                      </td>


                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <select
                          id="country"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          // onClick={(e) => setStatus(e.target.value)}
                          onClick={(e) => handleChangeStatus(attendance, e.target.value)}
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
                          <div>{attendance.present}</div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">

                          <div>{attendance.late}</div>

                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{attendance.coveredDay}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{attendance.dayOff}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>
                            {attendance.excusedLeave}
                          </div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{attendance.sick}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>
                            {attendance.unexcusedleave}
                          </div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-r">
                            <div>
                              <button
                                onClick={() => save(attendance)}
                                title="Save"
                              >
                                <CheckCircle className="h-6 fill-[#0b3768] hover:fill-[#15803d]" />
                              </button>
                            </div>
                            <button title="Details">
                              <InfoIcon
                                className="h-6 fill-[#0b3768] hover:fill-[#15803d]"
                                onClick={(e) =>
                                  setAttendanceEditModel(attendance._id)
                                }

                              />
                              {editAttendanceModel === attendance._id && (
                                <EditAttendance
                                  attendance={attendance}
                                  setModel={setAttendanceEditModel}
                                />
                              )}
                            </button>
                            <button title="Export to CSV" onClick={() => handleExportSingleInternAttendanceToCsv(attendance)}>
                              <SystemUpdateAlt className="h-6 fill-[#0b3768] hover:fill-[#15803d]" />
                              <CSVLink ref={csvLinkSingleIntern} data={singleInternAttendanceInfo}></CSVLink>
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
