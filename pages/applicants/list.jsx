import { Add, Circle, SystemUpdateAlt } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import AcceptAplcntModal from "../../components/Modal/AcceptAplcntModal.jsx";
import RejectModal from "../../components/Modal/RejectModal";
import { CSVLink } from "react-csv";
import axios from "axios";
import cookie from "js-cookie";
import LoadingState from "../../components/Utils/LoadingState";
import useTableSearch from "../../hooks/useTableSearch";
import { listHeaders } from "./headers.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function ApplicantsList({ students }) {
  const [acceptAplcntModal, setAcceptAplcntModal] = useState(false);
  const [noAnswerModal, setNoAnswerModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [intern, setIntern] = useState({});
  const [open, setOpen] = useState(false);
  const [searchedVal, setSearchedVal] = useState("");

  // Custom hook to search the table
  const { filteredData } = useTableSearch({ data, searchedVal });

  const token = cookie.get("token");

  const applicantListTableHeaders = [
    "Full Name",
    "Applied on",
    "Department",
    "Position",
    "Completion",
    "Status",
    "Action",
  ];

  // set progress bar
  let setProgressBar = (progress) => {
    switch (progress) {
      case "New Candidate":
        return "20%";
      case "HR Interview":
        return "40%";
      case "CEO Interview":
        return "60%";
      case "Completing Documents":
        return "80%";
      case "Completed":
        return "100%";
      default:
        return "0%";
    }
  };

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
          `/api/applicant`,
          { params: { token: token } },
          config
        );
        setData(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    asyncRequest();
  }, []);


  const headers = [
    { label: "First name", key: "student.firstName" },
    { label: "Last name", key: "student.lastName" },
    { label: "Nationality", key: "student.nationality" },
    { label: "Departing Country", key: "student.departingCountry" },
    { label: "Date of birth", key: "student.dateOfBirth" },
    { label: "Email", key: "student.email" },
    { label: "Department", key: "department" },
    { label: "Phone Number", key: "student.phoneNumber" },
    { label: "Sex", key: "student.sex" },
    { label: "University", key: "student.university" },
    { label: "Application Date", key: "applicationDate" },
    { label: "Arrival Date", key: "arrivalDate" },
    { label: "Departure Date", key: "departureDate" },
    { label: "Hr Interview Date", key: "hrInterviewDate" },
    { label: "Interview Notes", key: "interviewNotes" },
    { label: "Position", key: "position" },
    { label: "Progress", key: "progress" },
    { label: "Rejection Reasons", key: "rejectionReasons" },
    { label: "Acceptance Letter", key: "documents.acceptanceLetter" },
    { label: "Accommodation Letter", key: "documents.accommodationLetter" },
    { label: "Arrival Tickets", key: "documents.arrivalTickets" },
    { label: "Confidentiality Letter", key: "documents.confidentialityLetter" },
    { label: "Curiculum Vitae", key: "documents.curiculumVitae" },
    { label: "Identification", key: "documents.identification" },
    { label: "Interview Record", key: "documents.interviewRecord" },

    {
      label: "Intern Development Plan",
      key: "documents.internDevelopmentPlan",
    },
    { label: "Learning Agreement", key: "documents.learningAgreement" },
  ];

  const csvReport = {
    separator: "  ",
    data: data,
    listHeaders: listHeaders,
    filename: "Extramus Applicant List",
  };

  return (
    <section className="w-full">
      <LoadingState open={isloading} />
      <div className="w-full mb-12">
        <div className="relative flex flex-col bg-white min-w-0 break-words w-full mb-6 shadow-lg rounded">
          {/* Title Container */}
          <Box
            display="flex"
            py={2}
            flexDirection="column"
            justifyContent="space-between"
            px={2}
          >
            <Grid
              container
              justifyContent="space-between"
              alignContent="space-evenly"
            >
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <h3 className="font-semibold text-2xl">Applicant List</h3>
              </Grid>
              <Grid
                container
                gap={4}
                xs={12}
                sm={12}
                md={4}
                lg={4}
                xl={4}
                justifyContent="space-between"
              >
                <Grid item>
                  <Button
                    size="medium"
                    color="primary"
                    startIcon={<SystemUpdateAlt className="text-sm" />}
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                    href="#"
                  >
                    <CSVLink {...csvReport}>Export to CSV</CSVLink>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="medium"
                    color="success"
                    startIcon={<Add className="text-sm" />}
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                    href="/applicants/new"
                  >
                    Add Candidate
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              py={2}
              container
              justifyContent="space-between"
              alignContent="space-evenly"
            >
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <h6 className="font-semibold text-lg">Statistics</h6>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                {/* search */}
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

          {/* Table */}
          <div className="block w-full overflow-x-auto">
            {data.length === 0 ? (
              <div
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap 
                  p-4 flex items-center"
              >
                The Applicants list is empty at the moment!
                <div className="text-blue-600/75 pl-1">
                  <Link href="/applicants/new"> Add a new applicant</Link>
                </div>
              </div>
            ) : (
              <Table className="items-center w-full border-collapse bg-white">
                {/* Table Head */}
                <TableHead>
                  <TableRow>
                    {applicantListTableHeaders.map((th) => (
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
                <TableBody>
                  {filteredData.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell align="left">
                        <span className="font-bold whitespace-nowrap">
                          {student.firstName} {student.lastName}{" "}
                        </span>
                      </TableCell>

                      <TableCell>{student.applicant.applicationDate}</TableCell>

                      <TableCell>{student.applicant.department}</TableCell>

                      <TableCell>{student.applicant.position}</TableCell>

                      <TableCell>
                        <div className="whitespace-nowrap">
                          {student.applicant.progress}
                        </div>
                        <span className="mr-2">
                          {setProgressBar(student.applicant.progress)}
                        </span>
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
                          <div
                            style={{
                              width: setProgressBar(student.applicant.progress),
                            }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                          ></div>
                        </div>
                      </TableCell>

                      <TableCell className="border-t-0 text-xs whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Circle className="h-3 w-3 text-yellow-500" />
                          On Progress
                        </div>
                      </TableCell>

                      <Popup
                        contentStyle={{
                          background: "transparent",
                          borderRadius: "1rem",
                        }}
                        trigger={
                          <TableCell className="align-middle text-xs whitespace-nowrap">
                            <Button size="small" type="submit">
                              <EditIcon />
                            </Button>
                          </TableCell>
                        }
                        position="bottom"
                      >
                        <div className="flex flex-col mr-2 mt-0">
                          <div className="cursor-pointer py-1">
                            <Button
                              size="small"
                              className="text-sm font-medium border-solid border-white text-white bg-[#0B3768] hover:bg-[#0b37682b] hover:text-[#0B3768]"
                              type="submit"
                              onClick={(e) => setAcceptAplcntModal(true)}
                            >
                              Accept
                            </Button>

                            {acceptAplcntModal && (
                              <AcceptAplcntModal
                                setAcceptAplcntModal={setAcceptAplcntModal}
                                stdId={student._id}
                              />
                            )}
                          </div>
                          <div>
                            <Button
                              size="small"
                              className="text-sm font-medium border-solid border-white text-white bg-[#0B3768]  hover:bg-[#0b37682b] hover:text-[#0B3768]"
                              type="submit"
                              onClick={(e) => setRejectModal(true)}
                            >
                              Reject
                            </Button>

                            {rejectModal && (
                              <RejectModal
                                student={student}
                                setRejectModal={setRejectModal}
                              />
                            )}
                          </div>
                        </div>

                        {/* </div> */}
                      </Popup>
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
