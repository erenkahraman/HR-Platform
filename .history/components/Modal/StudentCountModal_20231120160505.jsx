import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import LoadingState from "../Utils/LoadingState";
import axios from "axios";
import cookie from "js-cookie";
import FinishedStudentCountModal from "./FinishedStudentCountModal";

const departmanColor = (department) => {
  switch (department) {
    case "Information Technologies":
      return "text-blue-400";
    case "Human Resources":
      return "text-green-400";
    case "Digital Marketing":
      return "text-pink-400";
    case "Business & Data Analysis":
      return "text-orange-400";
    case "Project Management":
      return "text-purple-400";
    case "Language Teaching":
      return "text-yellow-400";
    case "UEX Designing":
      return "text-cyan-400";
    case "Administration":
      return "text-yellow-900";
    case "Business Lawyer ":
      return "text-orange-100";
    default:
      return "";
  }
};

const StudentCountModal = ({ setScModal, type }) => {
  const [departments, setDepartment] = useState([]);
  const [open, setOpen] = useState(false);
  const token = cookie.get("token");
  const [showFinishedModal, setShowFinishedModal] = useState(false);

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
          `/api/department`,
          { params: { token: token } },
          config
        );
        setDepartment(data);
        setOpen(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
      }
    };
    asyncRequest();
  }, [token]);

  // useEffect(() => {
  //   fetch("/api/department")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDepartment(data);
  //     });
  // });

  return (
    <div className=" opacity-90  bg-zinc-300 fixed inset-0 z-50   ">
      {open && <LoadingState open={open} />}
      <div className="flex h-screen justify-center items-center  ">
        <div className="flex-col bg-white border-4 m-4 rounded-xl px-10 p-0 ">
          <button
            onClick={(e) => setScModal(false)}
            className=" rounded px-4 py-2  text-black text-2xl"
          >
            <MdOutlineCancel />
          </button>
          <div className="flex flex-row gap-16 text-5xl  bg-white  mb-8 ml-4 mr-4">
          {departments.map((department) => (
            <div className="flex flex-row ml-5" key={department.id}>
              <div className="text-red-400">
                <BsPeopleFill
                  className={`text-2xl ${departmanColor(
                    department.department
                  )}`}
                />
              </div>
              <div className="flex flex-col text-sm font-bold">
                <div>{department.department}</div>
                <div className="text-xl ml-3">{department.onGoingInterns.length}</div>
              </div>
            </div>
          ))}

          </div>
          Button to open FinishedStudentCountModal
          <button
            onClick={() => setShowFinishedModal(true)}
            className="rounded px-4 py-2 ml-4 text-black text-xl"
          >
            Show Finished Students
          </button>
        </div>
      </div>
      {/* Show the FinishedStudentCountModal when showFinishedModal is true */}
      {showFinishedModal && (
        <FinishedStudentCountModal
          setShowFinishedModal={setShowFinishedModal}
        />
      )}
    </div>
  );
};

export default StudentCountModal;