import { CheckCircleOutline, WorkOutline, Verified } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Tooltip, Button } from "@material-tailwind/react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import cookie from "js-cookie";
import LoadingState from "../Utils/LoadingState";
import EditDocumentsModal from "../Modal/EditDocumentsModal";
import DownloadingIcon from '@mui/icons-material/Downloading';
import UploadIcon from '@mui/icons-material/Upload';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import Popup from 'reactjs-popup';
import { saveAs } from "file-saver";
import {withRouter} from 'next/router';

const DocumentListContent = ({ title, status,student }) => {
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

  const [file, setFile] = useState();
 

  const uploadToClient = (event) => {
    console.log(student.firstName.trim()+'_'+student.lastName);
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setFile(i);
 
    }
  };

  const uploadToServer = async (event) => {        
    const body = new FormData();
    
    body.append("file", file); 
    body.append("type", title);
    body.append("student", student.firstName.trim()+'_'+student.lastName);
    //alert(file.name + ' is successfully uploaded');  
    
   const response = await axios.post("/api/upload",body);
   console.log(response.data)
  };

  const downloadServer = async () => {
    /*const { size, elapsed, percentage, download,
            cancel, error, isInProgress } = useDownloader();*/
    const studentName = student.firstName.trim()+'_'+student.lastName;
   
    const body = new FormData();
    
    body.append("student", studentName);
    body.append("type", title);

    const dt = await axios.post("/api/download",body);
    
    console.log(process.env)
   /* saveAs(
      dt.data.URLFile,
      dt.data.file
    );*/
    //download(fileUrl, filename)
    /*status === "Incorrect" ? alert("Please upload the correct document") : null
    status === "Needs Review" ? alert("Please upload the correct document") : null
    status === "Not Submitted" ? alert("Please upload the correct document") : null*/

  };

  return (
    <div className={Border()}>
      <div className="text-[12px] ">{title}</div>
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
          onClick={uploadToServer}
        >
         <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Upload
  </span>
        </button>
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
      
      
      </div>
    </div>
  );
};

const DocumentList = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
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
  }, []);

  return (
    <div className="flex flex-col w-full gap-2">
      <LoadingState open={open} />
      {students.length == 0 ? (
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
        students.map((student, index) => (
          <div className="flex flex-col w-full py-2 px-6 gap-2 bg-white border rounded-md">
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
                    {student.applicant.department} /{" "}
                    {student.applicant.position}
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
                    onClick={(e) => {
                      setOpenDialog(student._id);
                    }}
                    variant="gradient"
                    className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
                  >
                    <MdOutlineModeEditOutline />
                  </Button>
                </Tooltip>
                {openDialog == student._id && (
                  <EditDocumentsModal
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    student={student}
                    index={index}
                    students={students}
                    type="applicant"
                  />
                )}
              </div>
            </div>

            {/* Middle */}
            <div className="flex gap-[2px]">
              {Object.keys(students[index].applicant.documents).map((name) => (
                
                <DocumentListContent
                  title={name}
                  status={students[index].applicant.documents[name]}
                  student={student}
            
                  
                />
              ))}
            </div>
            {/* Bottom */}
            <div className="flex justify-between">
              {/* Bottom Left */}
              <div className="flex items-center gap-5 text-xs font-light text-gray-500">
                <p>Applied on {student.applicant.applicationDate}</p>
                <p>HR Interview on {student.applicant.applicationDate}</p>
                <p>CEO Interview on {student.applicant.applicationDate}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default withRouter(DocumentList);