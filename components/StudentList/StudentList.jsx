import { CheckCircleOutline, WorkOutline, Verified } from "@mui/icons-material";
import React, { useState, useEffect } from 'react';
import { Tooltip, Button } from "@material-tailwind/react";
// import { ArrowRightAlt } from 'react-icons/fa';
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from 'axios';
import cookie from 'js-cookie'; // Make sure to import the appropriate 'cookie' library.
import Link from 'next/link';
import LoadingState from '../Utils/LoadingState';
import EditDocumentsModal from '../Modal/EditDocumentsModal';
import DownloadingIcon from '@mui/icons-material/Downloading';
import UploadIcon from '@mui/icons-material/Upload';
import Popup from 'reactjs-popup';
import ArrowRightAlt  from '@mui/icons-material/ArrowRightAlt';

// import DocumentListContent from './DocumentListContent'; // Assuming this is the path to your DocumentListContent component.

const DocumentListContent = ({ type, status,student }) => {
  const [fullpath,setFullPath] = useState();
  const [file, setFile] = useState();
  const [mess, setMess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const Border = () => {
    let isRounded;
    let statusColor;

    status === "Correct"
      ? (statusColor = " bg-green-400 ")
      : status === "Incorrect"
      ? (statusColor = " bg-red-400 ")
      : status === "Needs Review"
      ? (statusColor = " bg-blue-400 ")
      : status === "Not Submitted"
      ? (statusColor = " bg-gray-400 ")
      : null;
      

    let result =
      "flex flex-col items-center px-2 py-1 w-full gap-1 text-white " +
      isRounded +
      statusColor;
    return result;
  };

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files[0];
      setFile(files);
    }
  };
  

  const downloadServer = async () => {
    const studentName = student.firstName.trim()+'_'+student.lastName;
    const body = new FormData();

    const words = type.split(' ');
    const trimmedStr = words.join('');

    body.append("student", studentName);
    body.append("type", trimmedStr);
    
    const dt = await axios.post("/api/download",body);
   
    setFullPath("/uploads/"+dt.data.file);

    const hiddenTag = document.querySelector("#hiddenTag");
    hiddenTag.href="/uploads/"+dt.data.file;
    hiddenTag.click();
  
  };
  
 
  const handleFormSubmit = async (event) => {
    event.preventDefault();
 
    const studentName = student.firstName.trim()+'_'+student.lastName;
    const formData = new FormData();
   
    const words = type.split(' ');
    const trimmedStr = words.join('');
    if(!file){
      alert('Choose a file !');
      return;
    }
    const newfile = new File([file],studentName + ' ' +trimmedStr + ' '+ file.name,{type: file.type});
    formData.append('file', newfile);
    setMess("File has uploaded");

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  };
  return (
    <div className={Border()}>
      
      <div className="text-[12px] ">{type}</div>
      
      <div className="d-flex align-items-center ">

        <Popup
        contentStyle={{ background: "white", borderRadius: "0.25rem" }}
        trigger={
          <button className="bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl">
            <UploadIcon className="mx-2"/>
            <span className="mx-2 label text-blue-600 hidden">Upload</span>
          </button>
        }
        >
    {close => (
      <div className="m-2 p-4 border border-cyan-600">
      <form >
        <div >
          <h6 className="font-semibold text-xl  pt-2 pb-4">
            Upload File
          </h6>
          
        </div>

        {/* INFORMATION BOX */}

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
        <p color="green">{mess}</p>
          </div>
        </div>
       
      </form>
    </div>
    )}
  </Popup>
            
        { /**<button onClick={() => {location.href="http://localhost:3000/uploadForm"}} className="bg-transparent scale-100 border-blue-600 hover:scale-125 p-0 cursor-pointer text-xl">
          <UploadIcon className="mx-2"/>
          <span className="mx-2 label text-blue-600 hidden">Upload</span>
        </button>*/
      
    }


      <button className="bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
        onClick={downloadServer}
        >
      
  <DownloadingIcon className="mx-2"/>
  <span className="mx-2 label text-blue-600 hidden">Download</span>
    </button>
      <a id="hiddenTag" style={{display:'none'}} href={fullpath} download> </a>
      
      </div>
    </div>
  );
};
const StudentList = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState({ interns: [], applicants: [] }); // Combine data from both endpoints
  const token = cookie.get('token');

  useEffect(() => {
    setOpen(true);
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        // Make two separate API calls and combine the data
        const [internsResponse, applicantsResponse] = await Promise.all([
          axios.get('/api/internTest', { params: { token }, ...config }),
          axios.get('/api/applicant', { params: { token }, ...config }),
        ]);
        debugger;
        const internsData = internsResponse.data;
        const applicantsData = applicantsResponse.data;

        setData({ interns: internsData, applicants: applicantsData });
        setOpen(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="flex flex-col w-full gap-2">
      <LoadingState open={open} />
      {data.interns.length === 0 && data.applicants.length === 0 ? (
        <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center">
          The Intern and Applicant lists are empty at the moment!
          <div className="text-blue-600/75 pl-1">
            <Link href="/applicants/list"> Add a new Intern </Link>
            <Link href="/applicants/new"> Add a new applicant</Link>
          </div>
        </div>
      ) : (
        // Render the list for both interns and applicants
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            {data.interns.map((intern, index) => (
            
              <div key={index} className="flex flex-col w-full py-2 px-6 gap-2 bg-white border rounded-md">
              {/* Top */}
              <div className="flex justify-between">
              {/* Top Left */}
              <div className="flex gap-4 items-center">
                  <div className="flex font-semibold">
                  <p>
                      {intern.student.firstName} {intern.student.lastName}
                  </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-light text-gray-500">
                  <WorkOutline className="text-sm" />
                  <p>
                      {intern.department} / {intern.position}
                  </p>
                  </div>
              </div>
              {/* Top Right */}
              <div className="flex gap-2">
                  <div className="py-1 px-2 text-xs rounded bg-sky-200 text-blue-900">
                  Starting the {intern.startDate}
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
                      onClick={(e) => {
                      setOpenDialog(intern);
                      }}
                      variant="gradient"
                      className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
                  >
                      <MdOutlineModeEditOutline />
                  </Button>
                  </Tooltip>
                  {openDialog == intern && (
                  <EditDocumentsModal
                      openDialog={openDialog}
                      setOpenDialog={setOpenDialog}
                      intern={intern}
                      index={index}
                      type="internTest"
                  />
                  )}
              </div>
              </div>

              {/* Middle */}
              <div className="flex flex-col md:flex-row gap-[2px]">
              {Object.keys(intern.documents).map((name) => (
                  <DocumentListContent
                  key={name}
                  type={name}
                  status={intern.documents[name]}
                  interns={intern}
                  />
              ))}
              </div>

              {/* Bottom */}
              <div className="flex justify-between">
              {/* Bottom Left */}
              <div className="flex items-center gap-5 text-xs font-light text-gray-500">
                  <p>Starts on {intern.startDate}</p>
                  <p>Finishing on {intern.endDate}</p>
              </div>
              {/* Bottom Right */}
              <div className="flex cursor-pointer">
                  <div className="py-1 px-2 text-xs text-blue-900">
                  View All Documents
                  </div>
                  <ArrowRightAlt />
              </div>
              </div>
          </div>
      ))}

            {data.applicants.map((applicant, index) => (
              <div key={applicant.id} className="flex flex-col w-full py-2 px-6 gap-2 bg-white border border-green-500 rounded-md">
                  {/* Top */}
                  <div className="flex justify-between">
                  {/* Top Left */}
                  <div className="flex gap-4 items-center">
                      <div className="flex font-semibold">
                      <p>
                          {applicant.firstName} {applicant.lastName}
                      </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-light text-gray-500">
                      <WorkOutline className="text-sm" />
                      <p>
                          {applicant.department} / {applicant.position}
                      </p>
                      </div>
                  </div>
                  {/* Top Right */}
                  <div className="flex gap-2">
                      <div className="py-1 px-2 text-xs rounded bg-sky-200 text-blue-900">
                      Starting the {applicant.startDate}
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
                          onClick={(e) => {
                          setOpenDialog(applicant._id);
                          }}
                          variant="gradient"
                          className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
                      >
                          <MdOutlineModeEditOutline />
                      </Button>
                      </Tooltip>
                      {openDialog == applicant._id && (
                      <EditDocumentsModal
                          openDialog={openDialog}
                          setOpenDialog={setOpenDialog}
                          student={applicant}
                          index={index}
                          students={data.applicants}
                          type="applicant"
                      />
                      )}
                  </div>
                  </div>

                  {/* Middle */}
                  <div className="flex flex-col md:flex-row gap-[2px]">
                  {applicant.applicant.documents &&
                      Object.keys(applicant.applicant.documents).map((name) => (
                      <DocumentListContent
                          key={name}
                          type={name}
                          status={applicant.applicant.documents[name]}
                          student={applicant}
                      />
                      ))}
                  </div>

                  {/* Bottom */}
                  <div className="flex justify-between">
                  {/* Bottom Left */}
                  <div className="flex items-center gap-5 text-xs font-light text-gray-500">
                      <p>Applied on {applicant.applicationDate}</p>
                      <p>HR Interview on {applicant.hrInterviewDate}</p>
                      <p>CEO Interview on {applicant.ceoInterviewDate}</p>
                  </div>
                  </div>
              </div>                 
            ))}
        </div >
        
      )}
    </div>
  );
};

export default StudentList;