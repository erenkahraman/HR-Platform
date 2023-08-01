import React from "react";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Spinner, Button } from "flowbite-react";
import axios from "axios";
import cookie from "js-cookie";

const AcceptAplcntModal = ({ setAcceptAplcntModal, stdId }) => {
  const router = useRouter();
  const [spinnerState, SetSpinnerState] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const token = cookie.get("token");

  // Get Departments
  useEffect(() => {
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
        setDepartments(data);
      } catch (e) {
        console.error(e);
      }
    };
    asyncRequest();
  }, []);

  // useEffect(() => {
  //   fetch("/api/department")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDepartments(data);
  //     });
  // }, []);

  const calculateWeeks = (start, end) => {
    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.round(Math.abs(Date.parse(end) - Date.parse(start)) / msInWeek);
  };

  const handleSubmit = async (event) => {
    SetSpinnerState(true);
    event.preventDefault();
    const id = new mongoose.Types.ObjectId();
    const intern = {
      _id: id,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      department: departments[event.target.department.value].department,
      position: event.target.position.value,
      status: "Waiting Start Date",
      documents: {
        "Intern Development Plan": "Not Submitted",
        "learning Agreement After": "Not Submitted",
        "Accommodation Letter": "Not Submitted",
        "Confidentiality Agrement": "Not Submitted",
      },
      student: stdId,
      token: token,
    };
    intern.durationInWeeks = await calculateWeeks(
      intern.startDate,
      intern.endDate
    );
    const JSONintern = JSON.stringify(intern);
    const endpointIntern = "/api/intern";
    const endpointstudent = `/api/student/${stdId}`;
    const endpointDepartment = `/api/department/${departments[event.target.department.value]._id
      }`;
    const optionsIntern = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSONintern,
    };
    const optionsStudent = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        intern: intern._id,
        applicationStatus: "Accepted",
        token: token,
      }),
    };
    const optionsDepartment = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ type: "ONGOING", onGoingInterns: id }),
    };
    await fetch(endpointDepartment, optionsDepartment);
    await fetch(endpointstudent, optionsStudent);
    await fetch(endpointIntern, optionsIntern);
    router.push("/interns/InternsList");
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className=" bg-zinc-200 opacity-90 fixed inset-0 z-50   ">
          <div className="flex h-screen justify-center items-center ">
            <div className="flex-col justify-center  bg-[#36648c] py-12 px-24 border-4  rounded-xl ">
              <div className="flex  gap-2 mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-sm text-white w-32 "
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  required
                  id="startDate"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="flex gap-2 mb-4">
                <label
                  htmlFor="endDate"
                  className="block text-sm text-white w-32 "
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  required
                  id="endDate"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="flex  gap-2 mb-4">
                <label
                  htmlFor="department"
                  className="block text-sm text-white w-32"
                >
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onClick={(e) => {
                    setPositions(departments[e.target.value].positions);
                  }}
                >
                  {departments.map((department, i) => (
                    <option key={i} value={i}>{department.department}</option>
                  ))}
                </select>
              </div>

              <div className="flex  gap-2 mb-8">
                <label
                  htmlFor="position"
                  className="block text-sm text-white w-32"
                >
                  Position
                </label>
                <select
                  name="position"
                  id="position"
                  className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {positions.map((position, index) => (
                    <option key={index}>{position}</option>
                  ))}
                </select>
              </div>

              <div className="flex  flex-row ml-6">
                <button
                  onClick={(e) => setAcceptAplcntModal(false)}
                  className=" rounded px-4 py-2 text-white  bg-[#d42624] "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={
                    spinnerState
                      ? "rounded px-4 py-2 ml-4 text-white bg-gray-400 "
                      : "rounded px-4 py-2 ml-4 text-white bg-[#009147] "
                  }
                  disabled={spinnerState}
                >
                  Save and Move to Interns
                </button>
                {spinnerState ? (
                  <div role="status" className="px-4 py-2">
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AcceptAplcntModal;
