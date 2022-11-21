import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { color } from "@mui/system";


const DocumentListContent = ({ departmentColor }) => {
  const Border = () => {
    let departmentColor;

    department === "Frontend"
      ? (departmentColor = "border-blue-500")
      : department === "Backend"
      ? (departmentColor = "border-green-500")
      : department === "Design"
      ? (departmentColor = "border-yellow-500")
      : department === "Marketing"
      ? (departmentColor = "border-red-500")
      : department === "Human Resources"
      ? (departmentColor = "border-purple-500")
      : department === "Project Management"
      ? (departmentColor = "border-pink-500")
      : department === "Sales"
      ? (departmentColor = "border-orange-500")
      : department === "Operations"
      ? (departmentColor = "border-gray-500")
      : department === "Finance"
     

    let result =
      "flex flex-col items-center px-2 py-1 w-full gap-1 text-white " +
      isRounded +
      statusColor;
    return result;
  };

  return (
    <div className={Border()}>
      <div className="text-[10px] ">{color}</div>
      <BsPeopleFill className="text-sm" />
    </div>
  );
};




// var departmentColor = (department) => {
//   department === "Human Resources"
//       ? (departmentColor = " bg-green-400 ")
//       : department === "Marketing"
//       ? (departmentColor = " bg-blue-400 ")
//       : department === "Finance"
//       ? (departmentColor = " bg-yellow-400 ")
//       : department === "IT"
//   return (
//     <div className="flex flex-row ml-5">
//       <div className="flex flex-row items-center">
//        <BsPeopleFill />
//         <p className="text-white text-xs ml-2">{department}</p>
//       </div>
//     </div>
//   );
// };

  // if (department.interns.length < 2) {
  //   return (
  //     <div
  //       className={`flex flex-col gap-2 items-center justify-center w-20 h-20 rounded-full ${color.green}`}
  //     >
  //       <div className="text-white text-2xl">{department.interns.length}</div>
  //       <div className="text-white text-xs">{department.department}</div>
  //     </div>
  //   );
  // } else if (department.interns.length < 3) {
  //   return (
  //     <div
  //       className={`flex flex-col gap-2 items-center justify-center w-20 h-20 rounded-full ${color.blue}`}
  //     >
  //       <div className="text-white text-2xl">{department.interns.length}</div>
  //       <div className="text-white text-xs">{department.department}</div>
  //     </div>
  //   );
  //   }




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



// if (department.interns.length < 2) {
//       return (
//         <div
//           className={`flex flex-col gap-2 items-center justify-center w-20 h-20 rounded-full ${color.green}`}
//         >


//           <div className="text-white text-2xl">{department.interns.length}</div>  
//           <div className="text-white text-xs">{department.department}</div>
//         </div>
//       );
//     } else if (department.interns.length < 3) {
//       return (
//         <div
//           className={`flex flex-col gap-2 items-center justify-center w-20 h-20 rounded-full ${color.blue}`}
//         >
//           <div className="text-white text-2xl">{department.interns.length}</div>
//           <div className="text-white text-xs">{department.department}</div>
//         </div>
//       );
//     }    
//   ]);