import { Add, Circle, MoreHoriz, SystemUpdateAlt, HowToReg } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { server } from "../../next.config";
import Popup from "reactjs-popup";

import * as React from 'react';
import Modal from "../../components/Modal/Modal.jsx";
import { useState } from "react";
import Modal1 from "../../components/Modal/Modal1.jsx";
import Modal2 from "../../components/Modal/Modal2.jsx";
import { FiFilter } from "react-icons/fi";
import { Tooltip, Button } from "@material-tailwind/react";
import HiOutlineChatBubbleBottomCenter from "react-icons/hi"

export default function ApplicantsList({ students }) {
    const [modalOn, setModalOn] = useState(false);
    const [choice, setChoice] = useState(false);

    const clicked = () => {
        setModalOn(true)
    }

    const [modalOn1, setModalOn1] = useState(false);
    const [choice1, setChoice1] = useState(false);

    const clicked1 = () => {
        setModalOn1(true)
    }

    const [modalOn2, setModalOn2] = useState(false);
    const [choice2, setChoice2] = useState(false);

    const clicked2 = () => {
        setModalOn2(true)
    }






    // set progress bar
    let setProgressBar = progress => {
        switch (progress) {
            case 'New Candidate':
                return '20%';
            case 'HR Interview':
                return '40%';
            case 'CEO Interview':
                return '60%';
            case 'Completing Documents':
                return '80%';
            case 'Completed':
                return '100%';
            default:
                return '0%'
        }

    }

    //add student to interns
    let addToInterns = student => {

    }

    /*const submit = () => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => alert('Click Yes')
            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        });
      };*/

    return (
        <section className="relative w-full sm:static">
            <div className="w-full mb-12">
                <div className="relative sm:static flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                    {/* Title Container */}
                    <div className="flex flex-col rounded-t mb-0 mt-0 px-4 py-3 border-0 bg-white">
                        <div className="flex flex-row items-center ">
                            <div className="relative sm:static w-full px-4 max-w-full flex-grow flex-1 ">
                                <h3 className="font-semibold text-2xl">Applicant List</h3>
                            </div>
                        </div>
                        <div className="flex flex-row mt-3 gap-2">


                            <div className="flex flex-row gap-2 h-9">
                                <Link href="/import-list">
                                    <span className="gap-1 hover:bg-gray-200 group flex items-center rounded-md bg-gray-300 text-gray-500 text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                                        <SystemUpdateAlt className="text-sm " />
                                        CSV Import
                                    </span>
                                </Link>
                                <Link href="/applicants/new">
                                    <span className="hover:bg-green-400  group flex items-center rounded-md bg-green-500 text-white text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                                        <Add className="text-sm " />
                                        Add Candidate
                                    </span>
                                </Link>
                            </div>



                            <div className="flex flex-row-reverse bg-white mt-0 mb-4 ml-auto ">
                                {/* search */}
                                <form class="flex items-center h-9">
                                    <div class="relative w-full h-full">
                                        <div class="flex absolute h-full inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-white-500 dark:text-white-400" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <input type="text" id="simple-search" class="h-full w-52 rounded-r-lg  border-none bg-[#0B3768] px-10 text-white  placeholder:italic placeholder:text-white placeholder:text-sm" placeholder="Search..." required />
                                    </div>
                                    <button type="submit" class="w-8 px-2 rounded border-none h-full bg-blue-100  ml-1 mr-2 hover:bg-[#0B3768]/75 ">
                                        <svg class="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        <span class="sr-only">Search</span>
                                    </button>
                                </form>
                                <div className="">
                                    <select name="filter" className="rounded-l-lg h-9 border-r-transparent w-30 border-[#0B3768] border-r-white bg-[#0B3768] text-white text-sm " required>
                                        <option value="" disabled selected >Categories </option>
                                        <option value="Date">Name</option>
                                        <option value="Date">Date</option>
                                        <option value="Department">Department</option>
                                        <option value="Position">Position</option>
                                        <option value="Status">Status</option>
                                    </select>
                                </div>

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
                                        Applied On
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                                        Department
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                                        Position
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                                        Completion{" "}
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                                        Status
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y">
                                {students.map(student =>
                                    <tr key={student._id}>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                            <span className="ml-3 font-bold"> {student.firstName} {student.lastName} </span>
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {student.applicant.applicationDate}
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {student.applicant.department}
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {student.applicant.position}
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <div className="flex flex-col gap-1">
                                                <div>{student.applicant.progress}</div>
                                                <div className="flex items-center">
                                                    <span className="mr-2">{setProgressBar(student.applicant.progress)}</span>
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
                                                            <div
                                                                style={{ width: setProgressBar(student.applicant.progress) }}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center gap-2">
                                                <Circle className="h-3 w-3 text-yellow-500" />
                                                On Progress
                                            </div>
                                        </td>


                                        <Popup contentStyle={{ background: "transparent", borderRadius: "1rem" }}
                                            trigger={<td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
                                                <Tooltip className="bg-transparent text-black mt-3"
                                                    content="More Actions"
                                                    animate={{
                                                        mount: { scale: 1, y: 0 },
                                                        unmount: { scale: 0, y: 25 },
                                                    }}>
                                                    <Button variant="gradient" className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"><MoreHoriz /></Button>
                                                </Tooltip>
                                            </td>} position="bottom">
                                            <div class="h-48 w-52 ...">
                                                <div className="flex flex-col ml-8 ">


                                                    <div>
                                                        <Link href="/applicants/edit">
                                                            <span className="w-28 inline-flex justify-center py-2 px-4  shadow-sm text-sm font-medium border-solid border-2 border-white  text-white bg-[#0B3768]  hover:bg-white hover:text-[#0B3768]">
                                                                Edit
                                                            </span>
                                                        </Link>
                                                    </div>

                                                    <div className="flex cursor-pointer">
                                                        <button className="w-28 inline-flex justify-center py-2 px-4  shadow-sm text-sm font-medium border-solid border-2 border-white  text-white bg-[#0B3768]  hover:bg-white hover:text-[#0B3768]"
                                                            type="submit"
                                                            onClick={clicked}

                                                        >
                                                            Accepted
                                                        </button>
                                                        {choice}

                                                        {modalOn && < Modal setModalOn={setModalOn} setChoice={setChoice} />}
                                                    </div>

                                                    <div>
                                                        <button onClick={clicked1}
                                                            type="submit"
                                                            className="w-28 inline-flex justify-center py-2 px-4  shadow-sm text-sm font-medium border-solid border-2 border-white text-white bg-[#0B3768]  hover:bg-white hover:text-[#0B3768]"
                                                        >
                                                            No Answer
                                                        </button>
                                                        {choice1}

                                                        {modalOn1 && < Modal1 setModalOn1={setModalOn1} setChoice1={setChoice1} />}
                                                    </div>

                                                    <div>
                                                        <button onClick={clicked2}
                                                            type="submit"
                                                            className="w-28 inline-flex rounded-b-lg justify-center py-2 px-4  shadow-sm text-sm font-medium boeder-solid border-2 border-white text-white bg-s bg-[#0B3768]  hover:bg-white hover:text-[#0B3768]"
                                                        >
                                                            Rejected
                                                        </button>
                                                        {choice2}

                                                        {modalOn2 && < Modal2 setModalOn2={setModalOn2} setChoice2={setChoice2} />}
                                                    </div>




                                                </div>
                                            </div>



                                            {/* </div> */}



                                        </Popup>

                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}



export async function getStaticProps() {

    const res = await fetch(`${server}/api/applicant`);
    const students = await res.json();
    return {
        props: {
            students
        }
    }
}