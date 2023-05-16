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
import Popup from 'reactjs-popup';

const DocumentListContent = ({ type, status,student }) => {
  const [fullpath,setFullPath] = useState();
  const [file, setFile] = useState();
  const [mess, setMess] = useState("");

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
    console.log("/uploads/"+dt.data.file)
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
      alert('Chose a file !');
      return;
    }
    const newfile = new File([file],studentName + ' ' +trimmedStr + ' '+ file.name,{type: file.type});
    
    formData.append('file', newfile);
   setMess("test");
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
       { (mess && <div id="alert-2" class="flex p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  <span class="sr-only">Info</span>
  <div class="ml-3 text-sm font-medium">
    A simple info alert with an <a href="#" class="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like.
  </div>
  <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
    <span class="sr-only">Close</span>
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
  </button>
</div>)} 
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
          <div className="flex flex-col w-full py-2 px-6 gap-2 bg-white border border-green-500 rounded-md">
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
                  type={name}
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
