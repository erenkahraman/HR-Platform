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
import { UiFileInputButton } from "./UiFileInputButton";
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

  const [file, setFile] = useState();

  const onChange = async (formData) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };
   
    const response = await axios.post('/api/upload', formData, config);

    console.log('response', response.data);
  };

  return (
    <div className={Border()}>
      <div className="text-[12px] ">{title}</div>
      <div className="d-flex align-items-center ">
        
          {//<input type="file" onChange={handleFile}/>
          }
          
            <UiFileInputButton
              label="Upload Single File"
              uploadFileName="theFile"
              onChange={onChange}/> 
        
            
            { /**<button onClick={() => {location.href="http://localhost:3000/uploadForm"}} className="bg-transparent scale-100 border-blue-600 hover:scale-125 p-0 cursor-pointer text-xl">
              <UploadIcon className="mx-2"/>
              <span className="mx-2 label text-blue-600 hidden">Upload</span>
            </button>*/
          
        }
         <Popup
          contentStyle={{ background: "#0B3768", borderRadius: "0.25rem" }}
          trigger={
            <button className="bg-white flex w-[25rem] p-3 rounded-md border-2 items-center justify-start gap-3">
              <div className="buttonImage text-[#2F80ED] bg-sky-100 flex items-center justify-center h-12 w-12 rounded-full">
                <UploadFileOutlined />
              </div>
              <div className="buttonText mb-1">
                Add New Post
                <p className="text-xs">
                  Start adding your post to inform another employee
                </p>
              </div>
            </button>
          }
          position="bottom"
        >
          {/* NEW POST */}
          <div className="m-2 p-4">
            <form onSubmit={handleSubmitWhatsNew}>
              <div>
                <h6 className="font-semibold text-xl text-white pt-2 pb-4">
                  New Post
                </h6>
                <div className="flex flex-row mx-2 mt-2 mb-4">
                  <h2 className="font-semibold text-l text-white ">By: </h2>
                  <input
                    id="postedBy"
                    type="text"
                    className="rounded border-none bg-[#e0f2fe] text-black h-7 w-72 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
                    placeholder="Type your name..."
                    required
                  />
                </div>
              </div>

              {/* INFORMATION BOX */}

              <div className="flex flex-col">
                <div className="pb-2 pt-6">
                  <input
                    id="title"
                    type="text"
                    className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                    placeholder="Type the subject..."
                    required
                  />
                </div>
                <div>
                  <textarea
                    id="paragraph"
                    className="rounded border-none bg-[#e0f2fe] text-black h-72 w-80 ml-2 pl-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                    placeholder="Type the information..."
                    required
                  />
                </div>
              </div>

              {/* BUTTOM PART */}
              <div className="flex flex-row pt-20">
                <input
                  id="date"
                  type="date"
                  className="rounded border-none bg-[#e0f2fe] text-#0B3768 h-7 ml-2 "
                />
                <div className="pl-20">
                  {/* <button className="pr-2 ">
                    {" "}
                    <Cancel className=" fill-[#e0f2fe] hover:fill-[#991b1b]" />{" "}
                  </button> */}
                  <button type="submit">
                    {" "}
                    <Verified className="fill-[#e0f2fe] hover:fill-[#15803d]" />{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
            {/*<button className="bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
              onClick={() => {
              status === "Incorrect" ? alert("Please upload the correct document") : null
              status === "Needs Review" ? alert("Please upload the correct document") : null
              status === "Not Submitted" ? alert("Please upload the correct document") : null
            }}
          >
      
  <DownloadingIcon className="mx-2"/>
  <span className="mx-2 label text-blue-600 hidden">Download</span>
    </button>*/}
      <button
      className="bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
      onClick={() => { 
        alert ("Please upload the interview record")
      }}
      >

      <SlowMotionVideoIcon className="mx-2"/>
      <span className="mx-2 label text-blue-600 hidden">View</span>
      </button>
      </div>
    </div>
    </Popup>
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

export default DocumentList;