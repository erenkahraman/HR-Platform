import {
  ArrowRightAlt,
  AssignmentTurnedInOutlined,
  CheckCircleOutline,
  MoreHoriz,
  WorkOutline,
} from "@mui/icons-material";
import { Circle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Link from "next/link";
import { DocumentList as DocumentListt } from "../../components/DocumentList";
import { Tooltip, Button } from "@material-tailwind/react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { DocumentReview } from "../../components/DocumentReview";
import { set } from "mongoose";
import axios from "axios";
import cookie from "js-cookie";
import LoadingState from "../Utils/LoadingState";

const DocumentListContent = ({ title, status }) => {
  const Border = () => {
    let isRounded;
    let statusColor;

    status === "Correct"
      ? (statusColor = " bg-green-400 ")
      : status === "Incorrect"
      ? (statusColor = " bg-red-400 ")
      : status === "Needs Review"
      ? (statusColor = " bg-blue-400 ")
      : (statusColor = " bg-gray-400 ");

    let result =
      "flex flex-col items-center px-2 py-1 w-full gap-1 text-white " +
      isRounded +
      statusColor;
    return result;
  };

  return (
    <div className={Border()}>
      <div className="text-[10px] ">{title}</div>
      <CheckCircleOutline className="text-sm" />
    </div>
  );
};

const DocumentList = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleEdit = () => setEdit(!edit);

  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const token = cookie.get("token");

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

  return (
    <div className="flex flex-col w-full gap-2">
      <LoadingState open={open} />
      {data.length == 0 ? (
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
        data.map((student, index) => (
          <div
            className="flex flex-col w-full py-2 px-6 gap-2 bg-white border rounded-md"
            key={student.id}
          >
            {/* Top */}
            <div className="flex justify-between">
              {/* Top Left */}
              <div className="flex gap-4 items-center">
                <div className="flex font-semibold">
                  <p>
                    {student.student.firstName} {student.student.lastName}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-light text-gray-500">
                  <WorkOutline className="text-sm" />
                  <p>
                    {student.department} / {student.position}
                  </p>
                </div>
              </div>
              {/* Top Right */}
              <div className="flex gap-2">
                <div className="py-1 px-2 text-xs rounded bg-sky-200 text-blue-900">
                  Starting the {student.startDate}
                </div>

                <Tooltip
                  className="bg-transparent text-black"
                  content="Edit"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <Button
                    onClick={handleOpen}
                    variant="gradient"
                    className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
                  >
                    <MdOutlineModeEditOutline />
                  </Button>
                </Tooltip>
                <Dialog
                  open={open}
                  className="fixed  w-1/2 h-2/3 ml-64 px-80 p-0 pl-8 mt-32 border-2 border-[#0B3768] rounded-xl shadow-lg shadow-[#0B3768]"
                >
                  {/*<DialogHeader>Edit Documents</DialogHeader>*/}
                  <DialogBody className="" divider>
                    <div className="flex p-4">
                      <div className="flex flex-col w-full gap-4">
                        <div className="flex gap-6 justify-start">
                          <div className="flex w-48 flex-col gap-2">
                            <label
                              htmlFor="cv"
                              className="block text-sm font-semibold"
                            >
                              Curriculum Vitae
                            </label>
                            <select
                              name="cv"
                              id="cv"
                              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                              <option>Have</option>
                              <option>Don't have</option>
                            </select>
                          </div>

                          <DocumentReview title="Learning Agreement" />

                          <div className="flex w-48 flex-col gap-2">
                            <label
                              htmlFor="cv"
                              className="block text-sm font-semibold"
                            >
                              Accommodation Letter
                            </label>
                            <select
                              name="cv"
                              id="cv"
                              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                              <option>Send</option>
                              <option>Don't send</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-6 justify-start">
                          <DocumentReview title="Arrival Tickets" />
                          <DocumentReview title="Intern Development Plan" />
                          <DocumentReview title="Confidentiality Letter" />
                        </div>
                        <div className="flex gap-6 justify-start">
                          <DocumentReview title="Identification" />
                          <div className="flex w-48 flex-col gap-2">
                            <label
                              htmlFor="cv"
                              className="block text-sm font-semibold"
                            >
                              Invitation Letter
                            </label>
                            <select
                              name="cv"
                              id="cv"
                              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                              <option>Need Review</option>
                              <option>Incorrect</option>
                              <option>Correct</option>
                            </select>
                          </div>
                          <div className="flex w-48 flex-col gap-2">
                            <label
                              htmlFor="cv"
                              className="block text-sm font-semibold"
                            >
                              PCR Result
                            </label>
                            <select
                              name="cv"
                              id="cv"
                              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                              <option>Has Result</option>
                              <option>Hasn't Result</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogBody>
                  <div className="flex flex-row ml-6">
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-4 ml-auto px-6 text-red-400 bg-white hover:bg-red-400 hover:text-white border-red-400 rounded-xl border-2"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="gradient"
                        color="green"
                        onClick={handleEdit}
                        className="px-9 text-green-400 bg-white hover:bg-green-400 hover:text-white border-green-400 rounded-xl border-2"
                      >
                        <span>Edit</span>
                      </Button>
                    </DialogFooter>
                  </div>
                </Dialog>
              </div>
            </div>

            {/* Middle */}
            <div className="flex gap-[2px]">
              {Object.keys(data[index].documents).map((name) => (
                <DocumentListContent
                  key={index}
                  title={name}
                  status={data[index].documents[name]}
                />
              ))}
            </div>
            {/* Bottom */}
            <div className="flex justify-between">
              {/* Bottom Left */}
              <div className="flex items-center gap-1 text-xs font-light text-gray-500">
                <p>Applied on {student.applicationDate}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DocumentList;
