import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Link from "next/link";
import { Tooltip, Button } from "@material-tailwind/react";
import { useEffect } from "react";
import LoadingState from "../../components/Utils/LoadingState";
import axios from "axios";
import cookie from "js-cookie";
// import Popup from "reactjs-popup" //used for popup

export default function ApplicantsList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  // cities to get from checkbox
  const [cities, setCities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const token = cookie.get("token");

  const [departmentMenus, setDepartmentMenus] = useState({});
  const [openDepartmentMenus, setOpenDepartmentMenus] = useState({});

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
          `/api/applicant`,
          { params: { token: token } },
          config
        );
        setData(data);
        setOpen(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
      }
    };
    asyncRequest();
  }, []);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCities([...cities, value]);
    } else {
      setCities(cities.filter((e) => e !== value));
    }
  };

  const handleDepartmentChange = (studentId, selectedDepartment) => {
   
    const updatedData = data.map((student) => {
      if (student.applicant._id === studentId) {
        return {
          ...student,
          applicant: {
            ...student.applicant,
            selectedDepartment: selectedDepartment,
          },
        };
      }
      return student;
    });
    setData(updatedData);
    toggleDepartmentMenu(studentId);

  };

  const filterCities = (student) => {
   if (cities.length == 0) {
       return student;
     } else {
       return cities.includes(student.applicant.arrivalCity);
     }
   };
// const filterCities = (student) => {
//     if (cities.length === 0 && selectedDepartments.length === 0) {
//       return true;
//     } else {
//       const cityFilter = cities.length === 0 || cities.includes(student.applicant.arrivalCity);
//       const departmentFilter =
//         selectedDepartments.length === 0 ||
//         selectedDepartments.includes(student.applicant.department);
//       return cityFilter && departmentFilter;
//     }
//   };

const toggleDepartmentMenu = (studentId) => {
  setOpenDepartmentMenus((prevOpenMenus) => ({
    ...prevOpenMenus,
    [studentId]: !prevOpenMenus[studentId],
  }));
};

  return (
    <section className="relative w-full sm:static">
      <LoadingState open={open} />
      <div className="w-full mb-12 sm:static">
        <div className=" sm:static flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          {/* Title Container */}
          <div className=" relative sm:static flex justify-between rounded-t mb-0 px-4 pt-3 border-0 bg-white">
            <div className="flex flex-wrap items-center">
              <div className="relative sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">Applicant Arrival</h3>
              </div>
            </div>
          </div>
          <div className="border-0 bg-white ">
            <div>
              <div className="flex flex-row justify-between font-semibold pl-4 pt-5 pb-10">
                {/* Radio check */}
                <div className="pr-3 pl-1.5 pt-3">
                  <input
                    id="checked-checkbox"
                    type="checkbox"
                    name="city"
                    value="Terranova da Sibari"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="Terranova da Sibari"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Terranova da Sibari
                  </label>
                </div>
                <div className="pr-3 pl-1.5 pt-3">
                  <input
                    id="checked-checkbox"
                    type="checkbox"
                    name="city"
                    value="Bivo Cantinella"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="Bivo Cantinella"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Bivo Cantinella
                  </label>
                </div>
                <div className="pr-3 pl-1.5 pt-3">
                  <input
                    id="checked-checkbox"
                    type="checkbox"
                    name="city"
                    value="Sibari"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="Sibari"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Sibari
                  </label>
                </div>
                <div className="pr-3 pl-1.5 pt-3">
                  <input
                    id="checked-checkbox"
                    type="checkbox"
                    name="city"
                    value="Spezzano Albanese Terme"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="Spezzano Albanese Terme"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Spezzano Albanese Terme
                  </label>
                </div>
                {/* search 
                <form className="flex items-center ">
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
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
                      className="rounded border-none bg-[#0B3768]/75 px-10 text-white h-8 placeholder:italic placeholder:text-white/30 placeholder:text-sm"
                      placeholder="Search..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-10 px-2 rounded border-none bg-blue-100 h-8 ml-1 mr-2 hover:bg-[#0B3768]/75 "
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
                */}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="block w-full overflow-x-auto ">
            {data.length === 0 ? (
              <div
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap 
                  p-4 flex items-center"
              >
                The Applicants list is empty at the moment!
                <div className="text-blue-600/75 pl-1">
                  <Link href="/applicants/new"> Add a new applicant</Link>
                </div>
              </div>
            ) : (
              <table className="items-center w-full border-collapse bg-white">
                {/* Table Head */}
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                      Full Name
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                      Arrival Date
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                      Arrival Time
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                      Arrival City
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                      Pick Up By
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                      Department
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y">
                  {data.filter(filterCities).map((student) => (
                    <tr key={student.applicant._id} style={{ height: '50px'}}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="ml-3 font-bold">
                          {" "}
                          {student.firstName} {student.lastName}{" "}
                        </span>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {student.applicant.startDate}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {student.applicant.arrivalTime || "Not Set"}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {student.applicant.arrivalCity}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {student.applicant.pickUpBy || "Not Set"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {student.applicant.department}
                        <div className="relative inline-block text-left">
    <div>
      {/* <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id={`department-menu-${student.applicant._id}`}
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleDepartmentMenu(student.applicant._id)}
      >
        {student.applicant.selectedDepartment || "Select Department"}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button> */}
    </div>

    {/* Dropdown menu */}
    {/* {openDepartmentMenus[student.applicant._id] && (
    <div
    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby={`department-menu-${student.applicant._id}`}
    >
      <div className="py-1" role="none">
        <button
          onClick={() => handleDepartmentChange(student.applicant._id, "Digital marketing")}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Digital marketing
        </button>
        <button
          onClick={() => handleDepartmentChange(student.applicant._id, "Human resuorce")}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Human resuorce
        </button>
        <button
          onClick={() => handleDepartmentChange(student.applicant._id, "Bussines & Data analyst")}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Bussines & Data analyst
        </button>
        <button
          onClick={() => handleDepartmentChange(student.applicant._id, "Project management")}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Project management
        </button>
        <button
          onClick={() => handleDepartmentChange(student.applicant._id, "Languages")}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Languages
        </button>
        <button
          onClick={() => handleDepartmentChange(student.applicant._id, "ICT")}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          ICT
        </button>
        <button
          onClick={() => handleDepartmentChange(student.applicant._id, "UIX")}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          UIX
        </button>
        <button
          onClick={() => handleDepartmentChange(student.applicant._id, "Law")}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Law
        </button>
      </div>
    </div>
    )} */}
  </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
