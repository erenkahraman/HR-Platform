import { useState, useEffect } from "react";
import { Tooltip, Button } from "@material-tailwind/react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import cookie from "js-cookie";
import LoadingState from "../Utils/LoadingState";
import EditDocumentsModal from "../Modal/EditDocumentsModal";
import DownloadingIcon from '@mui/icons-material/Downloading';
import UploadIcon from '@mui/icons-material/Upload';
import Popup from 'reactjs-popup';
import { saveAs } from 'file-saver';
import { WorkOutline } from "@mui/icons-material";
import Link from "next/link";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Tooltip, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const DocumentListContent = ({ type, status, student }) => {
  const [file, setFile] = useState();
  const [mess, setMess] = useState("");

  const Border = () => {
    let statusColor;

    switch (status) {
      case "Correct":
        statusColor = "bg-green-400";
        break;
      case "Incorrect":
        statusColor = "bg-red-400";
        break;
      case "Needs Review":
        statusColor = "bg-blue-400";
        break;
      case "Not Submitted":
        statusColor = "bg-gray-400";
        break;
      default:
        statusColor = "";
    }

    return "flex flex-col items-center px-2 py-1 w-full gap-1 text-white " + statusColor;
  };

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files[0];
      setFile(files);
    }
  };

  const downloadServer = async () => {
    const studentName = `${student.firstName.trim()}_${student.lastName.trim()}`;
    const words = type.split(' ');
    const trimmedStr = words.join('');

    const body = new FormData();
    body.append("student", studentName);
    body.append("type", trimmedStr);

    try {
      const dt = await axios.post("/api/download", body);
      const fullPath = "/uploads/" + dt.data.file;

      const hiddenTag = document.createElement('a');
      hiddenTag.href = fullPath;
      hiddenTag.download = dt.data.file;
      hiddenTag.click();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const studentName = `${student.firstName.trim()}_${student.lastName.trim()}`;
    const words = type.split(' ');
    const trimmedStr = words.join('');

    if (!file) {
      alert('Choose a file!');
      return;
    }

    const newFile = new File([file], `${studentName} ${trimmedStr} ${file.name}`, { type: file.type });
    const formData = new FormData();
    formData.append('file', newFile);
    setMess("File has uploaded");

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={Border()}>
      <div className="text-[12px]">{type}</div>
      <div className="d-flex align-items-center">
        <Popup
          contentStyle={{ background: "white", borderRadius: "0.25rem" }}
          trigger={
            <button className="bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl">
              <UploadIcon className="mx-2" />
              <span className="mx-2 label text-blue-600 hidden">Upload</span>
            </button>
          }
        >
          {close => (
            <div className="m-2 p-4 border border-cyan-600">
              <form>
                <div>
                  <h6 className="font-semibold text-xl  pt-2 pb-4">
                    Upload File
                  </h6>
                </div>

                <div className="flex flex-col">
                  <input type="file" name="files" onChange={uploadToClient} />
                </div>
                <div className="flex flex-row pt-16">
                  <div className="pl-24">
                    <button
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                      type="submit"
                      onClick={handleFormSubmit}
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Upload
                      </span>
                    </button>
                    <p style={{ color: "green" }}>{mess}</p>
                  </div>
                </div>
              </form>
            </div>
          )}
        </Popup>

        <button
          className="bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
          onClick={downloadServer}
        >
          <DownloadingIcon className="mx-2" />
          <span className="mx-2 label text-blue-600 hidden">Download</span>
        </button>
      </div>
    </div>
  );
};

const DocumentList = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const token = cookie.get("token");

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
          `/api/applicant`,
          { params: { token: token } },
          config
        );
        setStudents(data);
        console.log(data);
        setOpen(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
      }
    };
    asyncRequest();
  }, [token]);

  return (
    <div className="flex flex-col w-full gap-2">
      <LoadingState open={open} />
      {students.length === 0 ? (
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
        students.map((student) => (
          <div className="flex flex-col w-full py-2 px-6 gap-2 bg-white border border-green-500 rounded-md" key={student._id}>
            {/* Top */}
            <div className="flex justify-between">
              {/* Top Left */}
              <div className="flex gap-4 items-center">
                <div className="flex font-semibold">
                  <p>
                    {student.firstName} {student.lastName}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-light text-gray-500">
                  <WorkOutline className="text-sm" />
                  <p>
                    {student.applicant.department} / {student.applicant.position}
                  </p>
                </div>
              </div>
              {/* Top Right */}
              <div className="flex gap-2">
                <div className="py-1 px-2 text-xs rounded bg-sky-200 text-blue-900">
                  Starting the {student.applicant.startDate}
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
                    onClick={() => setOpenDialog(student._id)}
                    variant="gradient"
                    className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
                  >
                    <MdOutlineModeEditOutline />
                  </Button>
                </Tooltip>
                {openDialog === student._id && (
                  <EditDocumentsModal
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    student={student}
                    students={students}
                    type="applicant"
                  />
                )}
              </div>
            </div>

            {/* Middle */}
            <div className="flex flex-col lg:flex-row gap-[2px]">
              {Object.keys(student.applicant.documents || {}).map((name) => (
                <DocumentListContent
                  key={name} // Add a unique key for each document list content
                  type={name}
                  status={student.applicant.documents[name]}
                  student={student}
                />
              ))}
            </div>
            {/* Bottom */}
            <div className="flex justify-between">
              {/* Bottom Left */}
              <div className="flex items-center gap-5 text-xs font-light text-gray-500">
                <p>Applied on {student.applicant.applicationDate}</p>
                <p>HR Interview on {student.applicant.hrInterviewDate}</p>
                <p>CEO Interview on {student.applicant.ceoInterviewDate}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DocumentList;
