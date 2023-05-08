import { Add, Circle, MoreHoriz, SystemUpdateAlt } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { BsPeopleFill } from "react-icons/bs";
import EditIcon from "@mui/icons-material/Edit";
// import Modal4 from "../../components/Modal/Modal4.jsx";
import Popup from "reactjs-popup";
import * as React from "react";
import { useState } from "react";
// import Modal5 from "../../components/Modal/Modal5.jsx";
import { Tooltip, Button } from "@material-tailwind/react";
import { AiOutlineEdit } from "react-icons/ai";


export default function ApplicantsList() {
  const [modalOn4, setModalOn4] = useState(false);
  const [choice4, setChoice4] = useState(false);

  const clicked4 = () => {
    setModalOn4(true);
  };
  const [modalOn5, setModalOn5] = useState(false);
  const [choice5, setChoice5] = useState(false);

  const clicked5 = () => {
    setModalOn5(true);
  };

  return (
    <section className="relative w-full sm:static">
      <div className="w-full mb-12">
        <div className="relative sm:static flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-3 border-0 bg-white">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center">
                <div className="relative sm:static w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-2xl">
                    End Internship List
                  </h3>
                </div>
              </div>
              <button
                onClick={clicked4}
                className="mr-52 ml-5 text-sm text-blue-300 hover:text-blue-500  "
              >
                View All
              </button>
              {choice4}
              {modalOn4 && (
                <Modal4 setModalOn4={setModalOn4} setChoice4={setChoice4} />
              )}
            </div>
            <div className="flex gap-2">
              <Link href="/import-list">
                <span className="gap-1 h-7 hover:bg-gray-200 group flex items-center rounded-md bg-gray-300 text-gray-500 text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                  <SystemUpdateAlt className="text-sm" />
                  CSV Import
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-row-reverse mt-4 mb-2">
            <div className="flex flex-row-reverse bg-white mt-0 mb-4 ml-auto ">
              {/* search */}
              <form className="flex items-center h-9">
                <div className="relative w-full h-full">
                  <div className="flex absolute h-full inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-white-500 dark:text-white-400"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="h-full w-52 rounded-r-lg  border-none bg-[#0B3768] px-10 text-white  placeholder:italic placeholder:text-white placeholder:text-sm"
                    placeholder="Search..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-8 px-2 rounded border-none h-full bg-blue-100  ml-1 mr-2 hover:bg-[#0B3768]/75 "
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="black"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>
              <div className="">
                <select
                  name="filter"
                  className="rounded-l-lg h-9 border-r-transparent w-30 border-[#0B3768] border-r-white bg-[#0B3768] text-white text-sm font-bold "
                  required
                >
                  <option value="" disabled selected>
                    Categories{" "}
                  </option>
                  <option value="Date">Name</option>
                  <option value="Date">Date</option>
                  <option value="Department">Department</option>
                  <option value="Position">Position</option>
                  <option value="Status">Status</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row gap-6 ml-9 h-8 border-b-2 text-lg border-black">
              <button 
              onClick={clicked4}
              className="rounded-xl text-lg font-bold hover:bg-slate-200">
                All
              </button>
              <button 
              onClick={clicked4}
              className="rounded-xl text-lg font-bold hover:bg-slate-200">
                Ongoing
              </button>
              <button 
              onClick={clicked4}
              className="rounded-xl text-lg font-bold hover:bg-slate-200">
                Finished
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="block w-full overflow-x-auto ">
            <table className="items-center w-full border-collapse bg-white">
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Full Name
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Start Date
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    End Date
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Duration In Weeks
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Department
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Position
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y">
                <tr>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <span className="ml-3 font-bold"> Alessio Rocco </span>
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    25/08/2021
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    Human Resources
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    Human
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    HI
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    Ho
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    Ongoing
                  </td>

                  <td className="border-t-0 px-6  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <Tooltip
                      className="bg-transparent text-black mt-2"
                      content="Edit"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <Button
                        variant="gradient"
                        className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
                      >
                        <Link href="/applicants/edit">
                          <AiOutlineEdit className="m-2 mb-0 mt-0" />
                        </Link>
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
