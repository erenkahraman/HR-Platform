import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Modal from "../../components/LiaModal/model1";
import Link from "next/link";
import { Tooltip, Button } from "@material-tailwind/react";
import { useEffect } from "react";
// import Popup from "reactjs-popup" //used for popup

export default function ApplicantsList() {
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);

  const clicked = () => {
    setModalOn(true);
  };

  const cancel = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to delete ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const profile = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to go to the profile ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/applicant")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  console.log(data);

  return (
    <section className="relative w-full sm:static">
      <div className="w-full mb-12 sm:static">
        <div className=" sm:static flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          {/* Title Container */}
          <div className=" relative sm:static flex justify-between rounded-t mb-0 px-4 pt-3 border-0 bg-white">
            <div className="flex flex-wrap items-center">
              <div className="relative sm:static w-full px-3 max-w-full flex-grow flex-1 ">
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
                    type="radio"
                    className="border-none read-only:bg-gray-200 p-2 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-700 duration-300 ..."
                  />
                  <label className="text-sm pl-1 ">Terranova da Sibari</label>
                </div>
                <div className="pr-3 pl-1.5 pt-3">
                  <input
                    type="radio"
                    className="border-none read-only:bg-gray-200 p-2 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-700 duration-300 ..."
                  />
                  <label className="text-sm pl-1 ">Bivo Cantinella</label>
                </div>
                <div className="pr-3 pl-1.5 pt-3">
                  <input
                    type="radio"
                    className="border-none read-only:bg-gray-200 p-2 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-700 duration-300 ..."
                  />
                  <label className="text-sm pl-1 ">Sibari</label>
                </div>
                <div className="pr-3 pl-1.5 pt-3">
                  <input
                    type="radio"
                    className="border-none read-only:bg-gray-200 p-2 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-700 duration-300 ..."
                  />
                  <label className="text-sm pl-1">
                    Spezzano Albanese Terme
                  </label>
                </div>
                {/* search */}
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
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="block w-full overflow-x-auto ">
            <table className="items-center w-full border-collapse bg-white">
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Full Name
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Departure Date
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Departure Time
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Departure City
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Pick Up By
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y">
                {data.map((applicant) => (
                  <tr key={applicant._id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <span className="ml-3 font-bold">
                        {" "}
                        {applicant.student.firstName}{" "}
                        {applicant.student.lastName}{" "}
                      </span>
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {applicant.departureDate}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {applicant.departureTime}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {applicant.departureCity}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {applicant.pickUpBy}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4 text-left">
                      {/* ICONS */}
                      <div className="flex flex-row">
                        <Tooltip
                          className="bg-transparent text-black mt-2"
                          content="Delete"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <Button
                            variant="gradient"
                            className="text-gray-700 text-lg scale-100 hover:scale-125 cursor-pointer py-1 p-0 mr-2 "
                            onClick={cancel}
                          >
                            <MdDeleteOutline />
                          </Button>
                        </Tooltip>
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
                            className="text-gray-700 text-lg scale-100 hover:scale-125 cursor-pointer py-1 p-0 mr-2 "
                            onClick={clicked}
                          >
                            <AiOutlineEdit />
                          </Button>
                        </Tooltip>

                        {/* <Popup  contentStyle={{background:"#0B3768", borderRadius:"0.25rem"}} trigger={<button><AiOutlineEdit /></button>}  position="left center">
												<div className="flex flex-row">
													<div >
														<input  className="rounded border-none bg-[#0B3768] text-white align-middle w-36 px-6 text-sm p-4 mx-7" type="text" name="applicant" value="Alena Mango" required />
													</div>
													<div>
														<input  className="rounded border-none bg-[#0B3768] text-white align-middle px-6 text-sm p-4 mx-7 " type="text" name="arrivalDate" value="09/02/2022" required />
													</div>
													<div>
														<input className="rounded border-none bg-[#0B3768] text-white align-middle px-6 text-sm p-4 mx-7" type="time" name="arrivalTime" value="12:00" required />
													</div>
													<div>
														<input  className="rounded border-none bg-[#0B3768] text-white align-middle w-36 px-5 text-sm p-4 mx-7" type="text" name="arrivalCity" value="Sibari" required />
													</div>
												</div>
													<div>
														<div className="flex flex-row rounded border-none bg-[#0B3768] h-full text-white align-middle px-4 text-sm p-4 mx-4 ">
														<button onClick={save}><MdDone className="hover:fill-[#15803d] mr-1 h-6 w-4"/></button>
														<button onClick={cancel}>< MdOutlineCancel className='hover:fill-[#991b1b]  h-6 w-4' /></button>
														</div>
													</div>
												</div>
											</Popup> */}

                        {modalOn && (
                          <Modal
                            setModalOn={setModalOn}
                            setChoice={setChoice}
                          />
                        )}

                        <Tooltip
                          className="bg-transparent text-black mt-2"
                          content="Edit Profile"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <Button
                            variant="gradient"
                            className="text-gray-700 text-lg scale-100 hover:scale-125 cursor-pointer py-1 p-0 mr-2 "
                          >
                            <Link href="/applicants/edit">
                              <RiAccountCircleLine />
                            </Link>
                          </Button>
                        </Tooltip>
                        {/* <button className="px-0.75">
												<RiAccountCircleLine onClick={profile} />
											</button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
