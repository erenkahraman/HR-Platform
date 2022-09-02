import { Add, Circle, MoreHoriz, SystemUpdateAlt, HowToReg} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { server } from "../../next.config";
import Popup from "reactjs-popup";

import * as React from 'react';
import Modal from "../../components/Modal/Modal.jsx";
import {useState} from "react";
import Modal1 from "../../components/Modal/Modal1.jsx";
import Modal2 from "../../components/Modal/Modal2.jsx";


export default function ApplicantsList({ students }) {
    const [modalOn, setModalOn] = useState(false);
    const [choice, setChoice] = useState(false)

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

    const [data, setData] = useState([])
    const [isloading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('/api/applicant')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])
    if (isloading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>


    return (
        <section className="relative w-full">
            <div className="w-full mb-12">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                    {/* Title Container */}
                    <div className="flex justify-between rounded-t mb-0 px-4 py-3 border-0 bg-white">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                <h3 className="font-semibold text-2xl">Applicant List</h3>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/import-list">
                                <span className="gap-1 hover:bg-gray-200 group flex items-center rounded-md bg-gray-300 text-gray-500 text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                                    <SystemUpdateAlt className="text-sm" />
                                    CSV Import
                                </span>
                            </Link>
                            <Link href="/applicants/new">
                                <span className="hover:bg-green-400 group flex items-center rounded-md bg-green-500 text-white text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                                    <Add className="text-sm" />
                                    Add Candidate
                                </span>
                            </Link>
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
                                {data.map(applicant =>
                                    <tr key={applicant._id}>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                            <span className="ml-3 font-bold"> {applicant.student.firstName} {applicant.student.lastName} </span>
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {applicant.applicationDate}
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {applicant.department}
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {student.applicant.position}
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <div className="flex flex-col gap-1">
                                                <div>{applicant.progress}</div>
                                                <div className="flex items-center">
                                                    <span className="mr-2">{setProgressBar(applicant.progress)}</span>
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
                                                            <div
                                                                style={{ width: setProgressBar(applicant.progress) }}
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
                                            trigger={<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                <button
                                                    type="submit"

                                                >
                                                    <EditIcon />
                                                </button>
                                            </td>} position="bottom">
                                            <div className="h-48 w-52 ...">
                                                <div className="flex flex-col ml-8 ">

                                                    <div>
                                                        <button
                                                            type="submit"
                                                            className="w-28 inline-flex rounded-t-lg justify-center py-2 px-4  shadow-sm text-sm font-medium border-solid border-2 border-white text-white bg-[#0B3768] hover:bg-white hover:text-[#0B3768] "
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>

                                                    <div className="felx cursor-pointer">
                                                        <button className="w-28 inline-flex justify-center py-2 px-4  shadow-sm text-sm font-medium border-solid border-2 border-white  text-white bg-[#0B3768]  hover:bg-white hover:text-[#0B3768]"
                                                            type="submit"
                                                            onClick={clicked}

                                                        >
                                                            Accept
                                                        </button>
                                                        {choice}

                                                        {modalOn && < Modal setModalOn={setModalOn} setChoice={setChoice} stdId={applicant.student._id} />}
                                                    </div>

                                 <div>
                                <button onClick={clicked1}
									type="submit"
									className="w-28 inline-flex justify-center py-2 px-4  shadow-sm text-sm font-medium border-solid border-2 border-white text-white bg-[#0B3768]  hover:bg-white hover:text-[#0B3768]"
								>
									No Answer
								</button>
                                {choice1 }

                                {modalOn1 && < Modal1 setModalOn1={setModalOn1} setChoice1={setChoice1} />}
                                </div>

                                <div>
                                <button onClick={clicked2}
									type="submit"
									className="w-28 inline-flex rounded-b-lg justify-center py-2 px-4  shadow-sm text-sm font-medium boeder-solid border-2 border-white text-white bg-[#0B3768]  hover:bg-white hover:text-[#0B3768]"
								>
									Rejected
								</button>
                                {choice2 }

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