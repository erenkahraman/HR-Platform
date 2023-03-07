import { CheckCircleOutline, WorkOutline } from "@mui/icons-material";
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
import ReactPlayer from "react-player";


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
      : status === "Not Submitted"
      ? (statusColor = " bg-gray-400 ")
      : null;
      


    let result =
      "flex flex-col items-center px-2 py-1 w-full gap-1 text-white " +
      isRounded +
      statusColor;
    return result;
  };

  const  [showVideo, setShowVideo] = useState(false);
  const  videoUrl = "https://www.youtube.com/watch?v=AdVkWdo78Qg";



  const [file, setFile] = useState();

  const handleFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:5000/api/applicant/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className={Border()}>
      <div className="text-[12px] ">{title}</div>
      <div className="d-flex align-items-center">
        {/* <form className="d-flex align-items-center">
          <input type="file" onChange={handleFile}/>
          <button onClick={handleFileUpload}>Upload</button>
        </form> */}
      { <button
      className="bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
      onClick={handleFileUpload}
      >
          <UploadIcon className="mx-2"/>
          <span className="mx-2 label text-blue-600 hidden">Upload</span>
        </button> }
        <button className="bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
        onClick={() => {
        status === "Incorrect" ? alert("Please upload the correct document") : null
        status === "Needs Review" ? alert("Please upload the correct document") : null
        status === "Not Submitted" ? alert("Please upload the correct document") : null
      }}
      >
    <DownloadingIcon className="mx-2"/>
    <span className="mx-2 label text-blue-600 hidden">Download</span>
      </button>
      <button
        className="bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
        onClick={() => setShowVideo(true)}
      >
        <SlowMotionVideoIcon className="mx-2"/>
        {/* <span className="mx-2 label text-blue-600">View</span> */}
      </button>

      {showVideo && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
          <div className="relative">
            <ReactPlayer url={videoUrl} playing={true} controls={true} width="100%" height="100%" />
            <button
              className="absolute top-0 right-0 p-4 text-gray-100 hover:text-white focus:outline-none"
              onClick={() => setShowVideo(false)}
            >
              <svg className="h-9 w-9 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M14.293 12l4.853-4.853a1 1 0 1 0-1.414-1.414L12.88 10.293a1 1 0 0 0 0 1.414l4.853 4.853a1 1 0 1 0 1.414-1.414L14.293 12z"
                />
                <path
                  fillRule="evenodd"
                  d="M9.707 12L4.854 16.853a1 1 0 0 0 1.414 1.414L11.12 13.707a1 1 0 0 0 0-1.414L6.268 6.854a1 1 0 0 0-1.414 1.414L9.707 12z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      
      </div>
    </div>
  );
  
};


const DocumentList = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [students, setStudents] = useState([]);
  const token = cookie.get("token");
    
  const addDocument = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const newDocument = {
      name: "New Document",
      status: "Not Submitted",
    };
    try {
      const { data } = await axios.post(
        `/api/applicant`,
        newDocument,
        config
      );
      setStudents([...students, data]);
      setOpenDialog(false);
    } catch (e) {
      console.error(e);
    }
  };


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
       <button onClick={addDocument}>Add Document</button>
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
                  videoUrl={students[index].applicant.videoUrl}
                  
                  
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
