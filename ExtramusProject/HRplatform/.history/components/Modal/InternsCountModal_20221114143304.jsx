import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { data } from "autoprefixer";

const DocumentListContent = ({ color }) => {
  const Border = () => {
    
    let color;
   
    if (department === "HR") {
      color = "border-red-500";
    } else if (department === "IT") {
      color = "border-blue-500";
    } else if (department === "Finance") {
      color = "border-green-500";
    } else if (department === "Marketing") {
      color = "border-yellow-500";
    } else if (department === "Sales") {
      color = "border-purple-500";
    } else if (department === "Operations") {
      color = "border-pink-500";
    } else if (department === "Legal") {
      color = "border-gray-500";
    } else if (department === "Engineering") {
      color = "border-orange-500";
    } else if (department === "Product") {
      color = "border-indigo-500";
    } else if (department === "Design") {
      color = "border-teal-500";

    }
    return color;
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
  });

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
            //   department.counter === +department.counter && (
            //     <div className="flex flex-col gap-4">
            //       <div className="flex flex-row gap-4">
            //         <BsPeopleFill className="text-4xl" />
            //         <div className="flex flex-col gap-2">
            //           <div className="text-2xl">{department.name}</div>
            //           <div className="text-2xl">{department.counter}</div>
            //         </div>
            //       </div>
            //     </div>
            //   )
            // ))}
                
              <div className="flex flex-row ml-5">
                <div className="text-red-400 ">
                <h3 className='count' style={{ color: count > 1 ? 'red' : 'green'}}>{count}</h3>
                  <BsPeopleFill />
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

}

export default InternsCountModal;
