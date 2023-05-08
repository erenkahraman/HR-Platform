import {Circle} from "@mui/icons-material";
import { MdDeleteOutline } from "react-icons/md"
import { AiOutlineEdit } from "react-icons/ai"
import { RiAccountCircleLine } from "react-icons/ri"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Link from "next/link";
import { Tooltip, Button } from "@material-tailwind/react";


export default function ApplicantsList() {

	const cancel = () => {
		confirmAlert({
			title: 'Confirm to submit',
			message: 'Are you sure you want to delete ?',
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
	}

	// const profile = () => {
	// 	confirmAlert({
	// 		title: 'Confirm to submit',
	// 		message: 'Are you sure you want to go to the profile ?',
	// 		buttons: [
	// 			{
	// 				label: 'Yes',
	// 				onClick: () => alert('Click Yes')
	// 			},
	// 			{
	// 				label: 'No',
	// 				onClick: () => alert('Click No')
	// 			}
	// 		]

	// 	});
	// }

    


    return (
        <section className="relative sm:static w-full">
            <div className="w-full mb-12">
                <div className="relative sm:static flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                    {/* Title Container */}
                    <div className="flex justify-between rounded-t  px-4 pt-6 pb-10 border-0 bg-white ">
                        <div className="flex flex-wrap items-center">
                            <div className="relative sm:static w-full px-4 max-w-full flex-grow flex-1 ">
                                <h3 className="font-semibold text-2xl">All Profiles</h3>
                            </div>
                        </div>
                        {/* search */}
                        <form class="flex items-center ">
                            <div class="relative w-full">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-white-500 dark:text-white-400" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="simple-search" class="rounded border-none bg-[#0B3768] px-10 text-white h-8 placeholder:italic placeholder:text-white placeholder:text-sm" placeholder="Search..." required />
                            </div>
                            <button type="submit" class="w-10 px-2 rounded border-none bg-blue-100 h-8 ml-1 mr-2 hover:bg-[#0B3768]/75 ">
                                <svg class="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                <span class="sr-only">Search</span>
                            </button>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="block w-full overflow-x-auto ">
                        <table className="items-center w-full border-collapse bg-white">
                            {/* Table Head */}
                            <thead>
                                <tr>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Applicant
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Departament
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Position
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Status
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Personal Email
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
                                        <span className=" font-bold">Alessio Rocco </span>
                                    </td>

                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        ITC
                                    </td>

                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        Front Web Developer
                                    </td>

                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <div className="flex items-center gap-2">
                                            <Circle className="h-3 w-3 text-yellow-500" />
                                            On Progress
                                        </div>
                                    </td>

                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        email@personal.com
                                    </td>

                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="flex flex-row text-md">
                                    <Tooltip className="bg-transparent text-black mt-2"
                                      content="Delete"
                                      animate={{
                                      mount: { scale: 1, y: 0 },
                                      unmount: { scale: 0, y: 25 },
                                      }}>
                                      <Button  variant="gradient" className="text-gray-700 text-lg scale-100 hover:scale-125 cursor-pointer py-1 p-0 mr-2 " onClick={cancel}><MdDeleteOutline /></Button>
                                      </Tooltip>

                                      <Tooltip className="bg-transparent text-black mt-2"
                                      content="Edit"
                                      animate={{
                                      mount: { scale: 1, y: 0 },
                                      unmount: { scale: 0, y: 25 },
                                      }}>
                                      <Button  variant="gradient" className="text-gray-700 text-lg scale-100 hover:scale-125 cursor-pointer py-1 p-0   " >
                                      <Link href="/applicants/edit">
                                        <AiOutlineEdit/>
                                        </Link>
                                        </Button>
                                      </Tooltip>
                                            </div>
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
