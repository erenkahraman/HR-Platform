import { Circle, SystemUpdateAlt } from "@mui/icons-material";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Tooltip } from "@material-tailwind/react";
import { AiOutlineEdit } from "react-icons/ai";
// import { IoDocumentOutline } from "react-icons/ai";
import { FaRegFile } from 'react-icons/fa';
import axios from "axios";
import cookie from "js-cookie";
import LoadingState from "../../components/Utils/LoadingState.jsx";
import StudentCountModal from "../../components/Modal/StudentCountModal.jsx";
//------
import FinishedStudentCountModal from "../../components/Modal/FinishedStudentCountModal.jsx"; 
// Import the StudentFinishedModal component
import useTableSearch from "../../hooks/useTableSearch";
import {
  Button,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const profileListTableHeaders = [
  "Full Name",
  "email",
  "Status",
  "Department / Position",
  "Start Date",
  "End Date",
  "Document",
  "Action",
];

export default function ApplicantsList({ status }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const token = cookie.get("token");
  const [scModal, setScModal] = useState(false);
  //setScModal2 for second modal for finished interns
  const [lvModal, setLvModal] = useState(false);
  //-----
  const [type, setType] = useState("");

  const border = ((status) => {
    let statusColor;

    status === "Accepted"
      ? (statusColor = " bg-green-400 ")
      : status === "Rejected"
        ? (statusColor = " bg-red-400 ")
        : status === "On Process"
          ? (statusColor = " bg-blue-400 ")
          : status === "Finished"
            ? (statusColor = " bg-orange-400 ")
            : null;
    let result = "w-2 h-2 mr-1 " + statusColor + " rounded-full";

    return result;
  });

  const bgBorder = ((status) => {
    let statusColor;

    status === "Accepted"
      ? (statusColor = "green")
      : status === "Rejected"
        ? (statusColor = "red")
        : status === "On Process"
          ? (statusColor = "blue")
          : status === "Finished"
            ? (statusColor = "orange")
            : null;
    let result = "inline-flex items-center bg-" + statusColor + "-100 text-" + statusColor + "-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-" + statusColor + "-900 dark:text-" + statusColor + "-300"
    return result;
  })

  const getStatusCircleColor = (applicationStatus) => {

    switch (applicationStatus) {
      case "Accepted":
        return "green";
      case "Rejected":
        return "red";
      case "On Process":
        return "blue";
      case "Finished":
        return "orange";
      default:
        return "black";
    }

  }
  useEffect(() => {
    setOpen(true);
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/student`,
          { params: { token: token } },
          config
        );
        setData(data);
        setOpen(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
      }
    };
    asyncRequest();
  }, [token]);

  const [searchedVal, setSearchedVal] = useState("");
  const { filteredData } = useTableSearch({ data, searchedVal });

  return (
    <section className="relative w-full sm:static">
      <LoadingState open={open} />
      <div className="w-full mb-12">
        <div className="relative sm:static flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
          {/* Title Container */}
          <Grid
            container
            className="flex justify-between rounded-t mb-0 px-4 py-3 border-0 bg-white"
          >
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center">
                <div className="relative sm:static w-full max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-2xl">Students</h3>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-between rounded-t py-4 mb-4 border-b-2 border-gray-400">
                <div className="flex gap-4 text-xs">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Circle className="text-xs text-green-500" />
                      The student has been Accepted
                    </div>
                    <div className="flex gap-2 items-center">
                      <Circle className="text-xs text-red-500" />
                      The student has been Rejected or havent been answered
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Circle className="text-xs text-blue-500" />
                      The students application is beeing processed
                    </div>
                    <div className="flex gap-2 items-center">
                      <Circle className="text-xs text-yellow-400" />
                      The student has finished his/her internship
                    </div>
                  </div>
                </div>
              </div>  
            </div>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                startIcon={<SystemUpdateAlt className="text-sm" />}
                href="/import-list"
              >
                CSV Import
              </Button>
            </Grid>
          </Grid>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            px={2}
          >
            <Grid
              container
              gap={2}
              pb={3}
              alignContent="space-evenly"
              justifyContent="space-between"
            >
              <Grid
                xs={12}
                sm={12}
                md={2}
                lg={4}
                xl={4}
                gap={2}
                container
                justifyContent="flex-start"
              >
                <Grid item>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      setScModal(true);
                      setType("onGoingInterns");
                    }}
                  >
                    Ongoing
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      // setScModal(true);
                      setLvModal(true);
                      //----------
                      setType("finishedInterns");
                    }}
                  >
                    Finished
                  </Button>
                </Grid>
              </Grid>
              {/* search */}
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
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
              </Grid>
            </Grid>
          </Box>
          {scModal && <StudentCountModal setScModal={setScModal} type={type} />}
          {/* ------ */}
          {lvModal && <FinishedStudentCountModal setLvModal={setLvModal} type={type} />}
          {/* ------- */}
          {/* Table */}
          <div className="block w-full overflow-x-auto ">
            {data.length === 0 ? (
              <div
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap 
                  p-4 flex items-center"
              >
                The student list is empty at the moment!
                <div className="text-blue-600/75 pl-1">
                  <Link href="/applicants/new"> Add a new applicant</Link>
                </div>
              </div>
            ) : (
              <Table className="items-center w-full border-collapse bg-white">
                {/* Table Head */}
                <TableHead>
                  <TableRow>
                    {profileListTableHeaders.map((th) => (
                      <TableCell
                        className="uppercase whitespace-nowrap font-semibold"
                        key={th}
                        align="left"
                        colSpan={1}
                      >
                        {th}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {/* Table Body */}
                <TableBody className="divide-y">
                  {filteredData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell align="left" key={student.id}>
                        <span className="font-bold whitespace-nowrap">
                          {" "}
                          <Circle className={`text-xs text-${getStatusCircleColor(student.applicationStatus)}-500`} />
                          {student.firstName} {student.lastName}{" "}
                        </span>
                      </TableCell>

                      <TableCell>{student.email}</TableCell>

                      <TableCell> {student.applicationStatus}</TableCell>
                      <TableCell>
                        {student.applicant.department} /{" "}
                        {student.applicant.position}
                      </TableCell>

                      <TableCell>{student.applicant.startDate}</TableCell>

                      <TableCell>{student.applicant.endDate}</TableCell>

                      <TableCell>            
                           <Tooltip
                          className="bg-transparent text-black mt-2"
                          content="Document"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <Button
                            variant="gradient"
                            className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
                          >                          
                            <Link href="/applicants/allDocuments">                    
                                <FaRegFile/>
                            </Link>
                          </Button>
                        </Tooltip></TableCell>

                      <TableCell>
                        <Tooltip
                          className="bg-transparent text-black mt-2"
                          content="Edit"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <Button
                            variant="gradient"
                            className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
                          >
                            {/* <Link href="/applicants/edit"> */}
                            <Link
                              href={{
                                pathname: "/applicants/new",
                                query: { student: JSON.stringify(student) },
                              }}
                              as={`/interns/${student.firstName}_${student.lastName}`}>
                              <AiOutlineEdit className="m-2 mb-0 mt-0" />
                            </Link>
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}