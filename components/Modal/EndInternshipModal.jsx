import React from "react";
import LoadingState from "../Utils/LoadingState";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


const EndInternshipModal = ({ intern, setEiModal }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

const handleAccept = async () => {
  setEiModal(false);
  setOpen(true);



  try {
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const deleteEndpoint = `/api/intern/${intern._id}`;

      await fetch(deleteEndpoint, deleteOptions);
    
      router.push("/Profile/list");
    } catch (error) {
      console.error("Error deleting intern:", error);
      setOpen(false);
    }
    debugger;
    const departmentUpdateOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*" - You might not need this header here
      },
      body: JSON.stringify({
        type: "FINISHED", // Assuming this is the value for finished interns
        finishedInterns: intern._id, // Assuming this is the intern ID
      }),
    };
  
    // Update the department's finishedInterns array
    await fetch(`/api/department/${intern.department}`, departmentUpdateOptions);
  }; 

  

 /* try{
    const optionsStd = {
      method: "PUT" , 
      headers: {
        "Content-Type": "application/json",
        "Access=Control-Allow-Origin" : "*",
      },
      body: JSON.stringify({
        applicationStatus: "Internship Finished",
      }),
    };

    const optionsSdprtmnt = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        type: "FINISHED",
        finishedInterns: `${intern._id}`,
      }),
    };

    const endPointDprtmnt = `/api/department/${intern.departement}`;
    const endPointStd = `/api/student/${intern.student._id}`;

    await fetch(endPointStd, optionsStd);
    await fetch(endPointDprtmnt, optionsSdprtmnt);

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*"
      },
    };
    const deleteEndpoint = `/api/intern/${intern._id}`;
    await fetch(`/api/intern/${intern._id}`, deleteOptions);

    router.push("/Profile/list");
  } catch (error) {
     console.error("Error deleting intern:", error);
    setOpen(false);
  }
}; */

return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      {open && <LoadingState open={open} />}
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-[#0B3768] py-12 px-24 border-4 rounded-xl">
          <div className="flex text-lg text-white ml-0 mb-8 py-0 px-0">
            Are you sure you want to{" "}
            <span className="flex mx-2 text-red-500 text-lg font-bold">
              end the internship
            </span>{" "}
            for {intern.student.firstName} {intern.student.lastName} ?
          </div>

          <div className="flex flex-row ml-32">
            <button
              onClick={(e) => setEiModal(false)}
              className="rounded px-4 py-2 text-white bg-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAccept}
              className="rounded px-4 py-2 ml-4 text-white bg-red-500"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndInternshipModal;


/*const EndInternshipModal = ({ intern, setEiModal }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    setEiModal(false);
    setOpen(true);
    const optionsStd = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        applicationStatus: "Intership Finished",
      }),
    };
    const optionsSdprtmnt = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        type: "FINISHED",
        finishedInterns: `${intern._id}`,
      }),
    };
    const endPointDprtmnt = `/api/department/${intern.departement}`;
    const endPointStd = `/api/student/${intern.student._id}`;
    await fetch(endPointStd, optionsStd);
    await fetch(endPointDprtmnt, optionsSdprtmnt);
    router.push("/Profile/list");
  };

  return (
    <div className="   bg-zinc-200 opacity-90 fixed inset-0 z-50   ">
      {open && <LoadingState open={open} />}
      <div className="flex h-screen justify-center items-center  ">
        <div className="flex-col justify-center  bg-[#0B3768] py-12 px-24 border-4  rounded-xl ">
          <div className="flex  text-lg  text-white ml-0  mb-8 py-0 px-0">
            Are you sure you want to{" "}
            <span className=" flex mx-2 text-red-500 text-lg font-bold">
              {" "}
              end the internship
            </span>{" "}
            for {intern.student.firstName} {intern.student.lastName} ?
          </div>

          <div className="flex  flex-row ml-32">
            <button
              onClick={(e) => setEiModal(false)}
              className=" rounded px-4 py-2 text-white  bg-blue-500 "
            >
              Cancel
            </button>
            <button
              onClick={handleAccept}
              className="rounded px-4 py-2 ml-4 text-white bg-red-500 "
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndInternshipModal; */
