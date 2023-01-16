import React from "react";
import { useState } from "react";
import LoadingState from "../Utils/LoadingState";
import { useRouter } from "next/router";
import cookie from "js-cookie";

const RejectModal = ({ student, setRejectModal }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const token = cookie.get("token");
  const handleChange = async () => {
    setOpen(true);
    const endpoint = `/api/student/${student._id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        applicationStatus: "Rejected",
        token: token,
      }),
    };
    await fetch(endpoint, options);
    router.reload(window.location.pathname);
    setRejectModal(false);
    setOpen(false);
  };
  return (
    <div className="   bg-zinc-200 opacity-90 fixed inset-0 z-50   ">
      <LoadingState open={open} />
      <div className="flex h-screen justify-center items-center  ">
        <div className="flex-col justify-center  bg-[#0B3768] py-12 px-24 border-4  rounded-xl ">
          <div className="flex  text-lg  text-white ml-0  mb-8 py-0 px-0">
          What is your reason for{" "}
            <p className="text-red-500 pl-2 pr-2 text-lg font-bold">reject</p>{" "}
            {student.firstName} {student.lastName} ?
          </div>
          <div className="">
            <textarea className="w-full h-32 rounded-md border-2 border-gray-300 p-4" />

          </div>
          <div className="flex  flex-row ml-32">
            <button
              onClick={(e) => setRejectModal(false)}
              className=" rounded px-4 py-2 text-white  bg-blue-500 "
            >
              Cancel
            </button>
            <button
              onClick={handleChange}
              className="rounded px-4 py-2 ml-4 text-white bg-red-500 "
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
