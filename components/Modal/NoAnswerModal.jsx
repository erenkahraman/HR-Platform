import React from "react";
import { useState } from "react";
import LoadingState from "../Utils/LoadingState";
import { useRouter } from "next/router";
import cookie from "js-cookie";
const NoAnswerModal = ({ student, setNoAnswerModal }) => {
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
        applicationStatus: "No Answer",
        token: token,
      }),
    };
    await fetch(endpoint, options);
    router.reload(window.location.pathname);
    setNoAnswerModal(false);
    setOpen(false);
  };
  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <LoadingState open={open} />
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center  bg-[#0B3768] py-12 px-24 border-4  rounded-xl">
          <div className="flex  text-lg  text-white ml-0  mb-8 py-0 px-0">
            Are you sure you want to change the status of {student.firstName}{" "}
            {student.lastName} to
            <p className="text-red-500 text-lg font-bold">No Answer? </p>
          </div>

          <div className="flex  flex-row ml-32">
            <button
              onClick={(e) => setNoAnswerModal(false)}
              className=" rounded px-4 py-2 text-white  bg-blue-500 "
            >
              Cancel
            </button>
            <button
              onClick={handleChange}
              className="rounded px-4 py-2 ml-4 text-white bg-red-500 "
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoAnswerModal;
