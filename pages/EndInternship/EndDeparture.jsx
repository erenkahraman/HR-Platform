import {useState} from 'react';
import { MdDeleteOutline } from "react-icons/md"
import { AiOutlineEdit } from "react-icons/ai"
import { RiAccountCircleLine } from "react-icons/ri"
import {MdDone} from "react-icons/md"
import {MdOutlineCancel} from "react-icons/md"
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Modal from "../../components/LiaModal/model3";
import Link from "next/link";
import { Tooltip, Button } from "@material-tailwind/react";

// import styled from "@material/styled"

export default function ApplicantsList() {

	const [modalOn,setModalOn]=useState(false);
	const [choice,setChoice]=useState(false);

	const clicked =() => {
		setModalOn(true)
	}
	
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

	const profile = () => {
		confirmAlert({
			title: 'Confirm to submit',
			message: 'Are you sure you want to go to the profile ?',
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

	return (
		<section name="relative w-full">
			<div className="w-full mb-12">
				<div className="relative flex flex-col  min-w-0 break-words w-full mb-6 shadow-lg rounded">
					{/* Title Container */}
					<div className="flex justify-between rounded-t mb-0 px-4 pt-3 border-0 bg-white">
						<div className="flex flex-wrap items-center">
							<div className="relative w-full px-3 max-w-full flex-grow flex-1 ">
								<h3 className="font-semibold text-2xl">Applicant Departure</h3>
							</div>
						</div>
					</div>
					<div className="border-0 bg-white">
						<div >
							<div className="flex flex-col-reverse = useRef(); md:flex-row justify-between font-semibold pl-4 pt-5 pb-10" >
	
								{/* Radio check */}
								<div className={"flex lg:flex-row  flex-col"}>
									<div className="pr-3 pl-1.5 pt-3">
										<input type="radio" className="flex-shrink-1 border-none read-only:bg-gray-200 p-2 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-700 duration-300 ..."  />
										<label className="text-sm pl-1 ">Terranova da Sibari</label>
									</div>
									<div className="pr-3 pl-1.5 pt-3">
										<input type="radio" className="border-none read-only:bg-gray-200 p-2 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-700 duration-300 ..." />
										<label className="text-sm pl-1 ">Bivo Cantinella</label>
									</div>
									<div className="pr-3 pl-1.5 pt-3">
										<input type="radio" className="border-none read-only:bg-gray-200 p-2 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-700 duration-300 ... " />
										<label className="text-sm pl-1 ">Sibari</label>
									</div>
									<div className="pr-3 pl-1.5 pt-3">
										<input type="radio" className="border-none read-only:bg-gray-200 p-2 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-700 duration-300 ..." />
										<label className="text-sm pl-1">Spezzano Albanese Terme</label>
									</div>
								</div>
								{/* search */}
								<form className="grid grid-cols-7 ">
									<div className="relative col-span-6">
										<div className="flex  absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
											<svg aria-hidden="true" className="w-5 h-5 text-white-500 dark:text-white-400" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
										</div>
										<input type="text" id="simple-search" className=" w-full rounded border-none bg-[#0B3768] px-10 text-white h-8 placeholder:italic placeholder:text-white placeholder:text-sm" placeholder="Search..." required />
									</div>
									<button type="submit" className="w-10 px-2 rounded border-none bg-blue-100 h-8 ml-1 mr-2 hover:bg-[#0B3768]/75 ">
										<svg className="w-full h-5" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
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
                  <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    APPLICANT
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    DEPARTURE DATE
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    DEPARTURE TIME
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    DEPARTURE CITY
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    PICK UP BY
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    ACTION
                  </th>
                </tr>
              </thead>

				{/* Table Body */}
				<tbody  className="divide-y">
					<tr>
						<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
							<span className="font-bold"> Alena Mango </span>
						</td>

						<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
							02/09/2022
						</td>

						<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
							12:00
						</td>

						<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
							<div className="flex flex-col gap-1">
								<div>Sibari</div>
							</div>
						</td>

						<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
							<div className="flex items-center gap-2">
								Francesco Di Marco
							</div>
						</td>

						<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4 text-left">
							{/* ICONS AND BUTTONS */}
							<div className="flex flex-row">
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
							<Button  variant="gradient" className="text-gray-700 text-lg scale-100 hover:scale-125 cursor-pointer py-1 p-0 mr-2 " onClick={clicked}><AiOutlineEdit /></Button>
							</Tooltip>
							{modalOn && < Modal setModalOn={setModalOn} setChoice={setChoice} />}

							<Tooltip className="bg-transparent text-black mt-2"
								content="Edit Profile"
								animate={{
								mount: { scale: 1, y: 0 },
								unmount: { scale: 0, y: 25 },
							}}>
							<Button  variant="gradient" className="text-gray-700 text-lg scale-100 hover:scale-125 cursor-pointer py-1 p-0 mr-2 ">
							<Link href="/applicants/edit">
							<RiAccountCircleLine />
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
