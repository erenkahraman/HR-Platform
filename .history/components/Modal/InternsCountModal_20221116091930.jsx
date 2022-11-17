import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { color } from "@mui/system";


 const departmanColor = (department) => {
  switch (department) {
    case "Information Technology":
      return "text-blue-400";
    case "Human Resources":
      return "text-green-400";
    default:
      return "";
  }
};


const InternsCountModal = ({ setIcModal }) => {
  const handleCancelClick4 = () => {
    setIcModal(false);
  };

  const [departments, setDepartment] = useState([]);

  useEffect(() => {
    fetch("/api/department")
      .then((res) => res.json())
      .then((data) => {
        setDepartment(data);
      });
  },);


  return (

    <div className=" opacity-90  bg-zinc-300 fixed inset-0 z-50   ">
      <div className="flex h-screen justify-center items-center  ">
        <div className="flex-col bg-white border-4 m-4 rounded-xl px-10 p-0 ">
          <button
            onClick={handleCancelClick4}
            className=" rounded px-4 py-2  text-black text-2xl"
          >
            <MdOutlineCancel />
          </button>
          <div className="flex flex-row gap-16 text-5xl  bg-white  mb-8 ml-4 mr-4">
            {departments.map((department) => (
              <div className="flex flex-row ml-5">
                <div className="text-red-400 ">
                  <BsPeopleFill
                    className={`text-2xl ${departmanColor(
                      department.department
                    )}`}
                  />
                </div>
                <div className="flex flex-col text-sm font-bold ">
                  <div>{department.department}</div>
                  <div className="text-xl ml-3 ">
                    {department.interns.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternsCountModal;



