import { Backdrop, CircularProgress, Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { confirmAlert } from "react-confirm-alert";
import SaveIcon from '@mui/icons-material/Save';
import "react-confirm-alert/src/react-confirm-alert.css";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; //if you want to use something cool :)
import { useState, useEffect } from "react";
import reactSelect from "react-select";
import { CheckCircle } from "@mui/icons-material";
import EditAttendance from "../../components/Modal/EditAttendance";
function Attendence() {
  //  const notify =() => toast ("Please check if everything before saving!");
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [intern, setIntern] = useState();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [editAttendanceModel, setAttendanceEditModel] = useState(false);
  const [dateIncluded, setDateIncluded] = useState(false)

  useEffect(() => {
    setLoading(true);
    fetch("/api/intern")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const save = (intern) => {
    setOpenAlert(false);
    setIntern(intern)
    if (status && date) {
      setOpen(false)
      confirmAlert({
        message: "Are you sure you want to save ?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              setOpen(true);
              intern.attendance.statusOfTheDay = status;
              intern.attendance[status].count++;
              intern.attendance[status].dates.push(date)
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
      setStatus("");
      setDate("");
    } else {
      setOpenAlert(true)
    }

  };

  const disableStatus = (intern, dt) => {
    if (intern.attendance.present.dates.includes(dt)
      || intern.attendance.late.dates.includes(dt)
      || intern.attendance.dayOff.dates.includes(dt)
      || intern.attendance.excusedLeave.dates.includes(dt)
      || intern.attendance.sick.dates.includes(dt)
      || intern.attendance.unexcusedleave.dates.includes(dt))
      setDateIncluded(true)
    else setDateIncluded(false)
  }

  if (isloading) return <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
  >
    <CircularProgress color="inherit" />
  </Backdrop>;
  if (!data) return <p>No profile data</p>;



  return (
    <section className="relative w-full">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="w-full mb-12">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">Intern Attendance</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/interns/monthAttendance">
                <span className="hover:bg-green-400 group flex items-center rounded-md bg-green-500 text-white text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                  <EventAvailableIcon className="text-m py-1" />
                  Month Attendance
                </span>
              </Link>
              <form className="flex flex-r justify-between">
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 py-2 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-white-500 dark:text-white-400"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeWidth="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="rounded border-none bg-[#0B3768]/75 px-10 text-white h-10 placeholder:italic placeholder:text-white/30 placeholder:text-sm"
                    placeholder="Search by name.."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-10 px-2 py-2 rounded border-none bg-blue-100 h-10 ml-1 mr-2 hover:bg-[#0B3768]/75 "
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="black"
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
                  <span className="sr-only">Search</span>
                </button>
              </form>
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
                    STATUS
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    PRESENT
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    LATE
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
                    SAVE
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y">
                {data.length == 0 ?
                  <tr className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">The interns list is empty</tr>
                  :
                  data.map((intern) => (

                    <tr key={intern.id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center mt-3">
                        <div className="font-bold">
                          {" "}
                          {intern.student.firstName} {intern.student.lastName}
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <input
                          type="date"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onInput={e => {
                            setDate(e.target.value)
                            disableStatus(intern, e.target.value)
                            setStatus('')
                          }}
                        ></input>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        {dateIncluded ?
                          <div className="text-red-600/75">Attendance already set!</div> :
                          <select
                            id="country"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onClick={e => setStatus(e.target.value)}
                          >
                            <option value="">-</option>
                            <option value="present" >Present</option>
                            <option value="late" >Late</option>
                            <option value="dayOff" >Day off</option>
                            <option value="excusedLeave" >Excused leave</option>
                            <option value="sick" >Sick</option>
                            <option value="unexcusedleave" >Unexecused leave</option>
                          </select>
                        }

                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div >{intern.attendance.present.count}</div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{intern.attendance.late.count}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{intern.attendance.dayOff.count}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{intern.attendance.excusedLeave.count}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{intern.attendance.sick.count}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{intern.attendance.unexcusedleave.count}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-r">
                            <div>
                              <button onClick={() => save(intern)} title="Save">
                                <CheckCircle className="h-6 fill-[#0b3768] hover:fill-[#15803d]" />
                              </button>
                            </div>
                            <button title="Edit" >
                              <SaveIcon className="h-6 fill-[#0b3768] hover:fill-[#15803d]" onClick={e => { setAttendanceEditModel(true) }} />
                              {editAttendanceModel && (<EditAttendance
                                intern={intern}
                                setModel={setAttendanceEditModel}
                              />)}

                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Attendence;
