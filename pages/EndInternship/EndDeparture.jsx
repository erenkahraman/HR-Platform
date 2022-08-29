import { Add, Circle, MoreHoriz, SystemUpdateAlt, EditOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md"
import { AiOutlineEdit } from "react-icons/ai"
import { RiAccountCircleLine } from "react-icons/ri"
import {MdDone} from "react-icons/md"
import {MdOutlineCancel} from "react-icons/md"
import Popup from "reactjs-popup"

export default function ApplicantsList() {

	return (
		<section className="relative w-full">
			<div className="w-full mb-12">
				<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
					{/* Title Container */}
					<div className="flex justify-between rounded-t mb-0 px-4 pt-3 border-0 bg-white">
						<div className="flex flex-wrap items-center">
							<div className="relative w-full px-3 max-w-full flex-grow flex-1 ">
								<h3 className="font-semibold text-2xl">Applicant Deprture</h3>
							</div>
						</div>
						{/* <div className="flex gap-2">
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
						</div> */}
					</div>
					<div className="border-0 bg-white ">
						<div >
							<div className="flex flex-row justify-between font-semibold pl-4 pt-5 pb-10" >
								{/* <h3 className="font-semibold text-2xl">Applicant Arrival</h3> */}

								{/* Radio check */}
								<div className="pr-3 pl-1.5 pt-3">
									<input type="radio" className="border-none bg-[#50d71e] read-only:bg-gray-100 p-2" />
									<label className="text-sm pl-1 ">Terranova da Sibari</label>
								</div>
								<div className="pr-3 pl-1.5 pt-3">
									<input type="radio" className="border-none read-only:bg-gray-100 p-2" />
									<label className="text-sm pl-1 ">Bivo Cantinella</label>
								</div>
								<div className="pr-3 pl-1.5 pt-3">
									<input type="radio" className="border-none read-only:bg-gray-100 p-2 " />
									<label className="text-sm pl-1 ">Sibari</label>
								</div>
								<div className="pr-3 pl-1.5 pt-3">
									<input type="radio" className="border-none read-only:bg-gray-100 p-2" />
									<label className="text-sm pl-1">Spezzano Albanese Terme</label>
								</div>
								{/* search */}
								<form class="flex items-center ">
									<div class="relative w-full">
										<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
											<svg aria-hidden="true" class="w-5 h-5 text-white-500 dark:text-white-400" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
										</div>
										<input type="text" id="simple-search" class="rounded border-none bg-[#0B3768]/75 px-10 text-white h-8 placeholder:italic placeholder:text-white/30 placeholder:text-sm" placeholder="Search..." required />
									</div>
									<button type="submit" class="w-10 px-2 rounded border-none bg-blue-100 h-8 ml-1 mr-2 hover:bg-[#0B3768]/75 ">
										<svg class="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
										<span class="sr-only">Search</span>
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
										{/* <Image
											src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
											className="bg-white rounded-full border"
											height="48"
											width="48"
											alt="..."
										/> */}
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
											{/* <div className="flex items-center">
												<span className="mr-2">80%</span>
												<div className="relative w-full">
													<div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
														<div
															style={{ width: "80%" }}
															className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
														></div>
													</div>
												</div>
											</div> */}
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex items-center gap-2">
											{/* <Circle className="h-3 w-3 text-gray-400" /> */}
											Francesco Di Marco
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4 text-left">
										{/* ICONS */}
										<div className="flex flex-row">
											<button className="px-0.75">
												<MdDeleteOutline />
											</button>
											<Popup  contentStyle={{background:"#0B3768", borderRadius:"0.25rem"}} trigger={<button><AiOutlineEdit /></button>}  position="left center">
												<div className="flex flex-row">
													<div >
														<input  className="rounded border-none bg-[#0B3768] text-white align-middle w-36 px-6 text-sm p-4 mx-7" type="text" name="applicant" placeholder="Applicant name..." required />
													</div>
													<div>
														<input  className="rounded border-none bg-[#0B3768] text-white align-middle px-6 text-sm p-4 mx-7 " type="date" name="arrivalDate" placeholder="Arrival Date..." required />
													</div>
													<div>
														<input className="rounded border-none bg-[#0B3768] text-white align-middle px-6 text-sm p-4 mx-7" type="time" name="arrivalTime" placeholder="Arrival Time..." required />
													</div>
													<div>
														<input  className="rounded border-none bg-[#0B3768] text-white align-middle w-36 px-5 text-sm p-4 mx-7" type="text" name="arrivalCity" placeholder="Arrival City..." required />
													</div>
													<div>
														<input className="rounded border-none bg-[#0B3768] text-white align-middle w-36 px-5 text-sm p-4 mx-7" type="text" name="pickUpBy" placeholder="Pick Up By..." required />
													</div>
													<div>
														<div className="flex flex-row rounded border-none bg-[#0B3768] h-full text-white align-middle px-4 text-sm p-4 mx-4 ">
														<MdOutlineCancel className=""/>
														<MdDone  />
														</div>
													</div>
												</div>
											</Popup>
											<button className="px-0.75">
												<RiAccountCircleLine />
											</button>
											
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
