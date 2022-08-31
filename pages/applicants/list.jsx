import {
  Add,
  Circle,
  MoreHoriz,
  SystemUpdateAlt,
  HowToReg,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ApplicantsList() {
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

  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);

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
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Full Name
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Applied On
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Department
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Completion{" "}
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
                                {data.map(student =>
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
>>>>>>> anouar
                      <div className="flex items-center gap-2">
                        <Circle className="h-3 w-3 text-yellow-500" />
                        On Progress
                      </div>
                    </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            <a
                                                href="#pablo"
                                                className="text-blueGray-500 block py-1 px-3"
                                            // onClick={addToInterns(student)}
                                            >
                                                <HowToReg />
                                            </a>
                                        </td>
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