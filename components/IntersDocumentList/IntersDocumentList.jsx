import { CheckCircleOutline, WorkOutline } from "@mui/icons-material";
import UploadIcon from '@mui/icons-material/Upload';
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Tooltip, Button } from "@material-tailwind/react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import cookie from "js-cookie";
import LoadingState from "../Utils/LoadingState";
import EditDocumentsModal from "../Modal/EditDocumentsModal";
import Popup from 'reactjs-popup';
import DownloadingIcon from '@mui/icons-material/Downloading';
import ArrowRightAlt  from '@mui/icons-material/ArrowRightAlt';
import { saveAs } from 'file-saver';


const DocumentListContent = ({ type, status,interns }) => {
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
      : (statusColor = " bg-gray-400 ");

    let result =
      "flex flex-col items-center px-2 py-1 w-full gap-1 text-white " +
      isRounded +
      statusColor;
    return result;
  };

 /**
  * 
  * @param {*} event 
  */
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files[0];
      setFile(files);
    }
  };
  

  const downloadServer = async () => {
    
    const internName = interns.student.firstName.trim()+'_'+interns.student.lastName;
    const body = new FormData();

    const words = type.split(' ');
    const trimmedStr = words.join('');

    body.append("intern", internName);
    body.append("type", trimmedStr);
    
    const dt = await axios.post("/api/download",body);
 
    setFullPath("/uploads/"+dt.data.file);

    const hiddenTag = document.querySelector("#hiddenTag");
    hiddenTag.href="/uploads/"+dt.data.file;
    hiddenTag.click();
  
  };
  
 
  const handleFormSubmit = async (event) => {

    event.preventDefault();
 
    const internName = interns.student.firstName.trim()+'_'+interns.student.lastName;
    const formData = new FormData();
   
    const words = type.split(' ');
    const trimmedStr = words.join('');
    if(!file){ 
      alert('Chose a file !');
      return;
    }
    const newfile = new File([file],internName + ' ' +trimmedStr + ' '+ file.name,{type: file.type});
  
    formData.append('file', newfile);
    setMess("File has uploaded");
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
  };
  
  return (
    <div className={Border()}>
      <div className="text-[10px] ">{type}</div>
      <div className="d-flex align-items-center ">
      
      <div>
      
    </div>
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

        {/* INFORMATION BOX  */}

        <div className="flex flex-col">
        {
          //<input type="file" name="files" onChange={uploadToClient} />
        }
            <input type="file" onChange={uploadToClient} />
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
  const [interns, setInterns] = useState([]);
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
          `/api/internTest`,
          { params: { token: token } },
          config
        );
        setInterns(data);
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
     
      {interns.length == 0 ? (
        <div
          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap 
                  p-4 flex items-center"
        >
          The Intern list is empty at the moment!
          <div className="text-blue-600/75 pl-1">
            <Link href="/applicants/list"> Add a new Intern</Link>
          </div>
        </div>
      ) : (
        interns.map((intern, index) => (
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
              {Object.keys(interns[index].documents).map((name) => (
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
              <div className="flex cursor-pointer">
              {/* Bottom Right */}
              <div className="py-1 px-2 text-xs text-blue-900">
                View All Documents
              </div>
              <ArrowRightAlt />
              
            </div>
              
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DocumentList;