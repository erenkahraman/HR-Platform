import { Add, Circle, MoreHoriz, SystemUpdateAlt } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export default function ApplicantsList() {
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
								<tr>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
										<Image
											src="https://demos.creative-tim.com/notus-js/assets/img/team-4-470x470.png"
											className="bg-white rounded-full border"
											height="48"
											width="48"
											alt="..."
										/>
										<span className="ml-3 font-bold"> Alessio Rocco </span>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										25/08/2021
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										Human Resources
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>CEO Interview</div>
											<div className="flex items-center">
												<span className="mr-2">60%</span>
												<div className="relative w-full">
													<div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
														<div
															style={{ width: "60%" }}
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

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
										<a
											href="#pablo"
											className="text-blueGray-500 block py-1 px-3"
											// onclick="openDropdown(event,'table-dark-1-dropdown')"
										>
											<MoreHoriz />
										</a>
										<div
											className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
											// id="table-dark-1-dropdown"
										>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Another action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Something else here
											</a>
											<div className="h-0 my-2 border border-solid border-blueGray-100"></div>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Seprated link
											</a>
										</div>
									</td>
								</tr>
								<tr>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
										<Image
											src="https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg"
											className="bg-white rounded-full border"
											height="48"
											width="48"
											alt="..."
										/>
										<span className="ml-3 font-bold"> Fabrizio David </span>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										25/08/2021
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										Data Analyst
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>New Candidate</div>
											<div className="flex items-center">
												<span className="mr-2">20%</span>
												<div className="relative w-full">
													<div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
														<div
															style={{ width: "20%" }}
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

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
										<a
											href="#pablo"
											className="text-blueGray-500 block py-1 px-3"
											// onclick="openDropdown(event,'table-dark-1-dropdown')"
										>
											<MoreHoriz />
										</a>
										<div
											className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
											// id="table-dark-1-dropdown"
										>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Another action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Something else here
											</a>
											<div className="h-0 my-2 border border-solid border-blueGray-100"></div>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Seprated link
											</a>
										</div>
									</td>
								</tr>
								<tr>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
										<Image
											src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
											className="bg-white rounded-full border"
											height="48"
											width="48"
											alt="..."
										/>
										<span className="ml-3 font-bold"> Samara Sydney </span>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										25/08/2021
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										ICT
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>New Candidate</div>
											<div className="flex items-center">
												<span className="mr-2">20%</span>
												<div className="relative w-full">
													<div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
														<div
															style={{ width: "20%" }}
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

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
										<a
											href="#pablo"
											className="text-blueGray-500 block py-1 px-3"
											// onclick="openDropdown(event,'table-dark-1-dropdown')"
										>
											<MoreHoriz />
										</a>
										<div
											className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
											// id="table-dark-1-dropdown"
										>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Another action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Something else here
											</a>
											<div className="h-0 my-2 border border-solid border-blueGray-100"></div>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Seprated link
											</a>
										</div>
									</td>
								</tr>
								<tr>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
										<Image
											src="https://demos.creative-tim.com/notus-js/assets/img/team-3-800x800.jpg"
											className="bg-white rounded-full border"
											height="48"
											width="48"
											alt="..."
										/>
										<span className="ml-3 font-bold"> Wilson bator </span>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										25/08/2021
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										Data Analyst
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>HR Interview</div>
											<div className="flex items-center">
												<span className="mr-2">40%</span>
												<div className="relative w-full">
													<div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
														<div
															style={{ width: "40%" }}
															className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
														></div>
													</div>
												</div>
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex items-center gap-2">
											<Circle className="h-3 w-3 text-red-500" />
											Rejected
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
										<a
											href="#pablo"
											className="text-blueGray-500 block py-1 px-3"
											// onclick="openDropdown(event,'table-dark-1-dropdown')"
										>
											<MoreHoriz />
										</a>
										<div
											className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
											// id="table-dark-1-dropdown"
										>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Another action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Something else here
											</a>
											<div className="h-0 my-2 border border-solid border-blueGray-100"></div>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Seprated link
											</a>
										</div>
									</td>
								</tr>
								<tr>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
										<Image
											src="https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg"
											className="bg-white rounded-full border"
											height="48"
											width="48"
											alt="..."
										/>
										<span className="ml-3 font-bold"> Jaxson Schleifer </span>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										25/08/2021
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										ICT
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>Completed</div>
											<div className="flex items-center">
												<span className="mr-2">100%</span>
												<div className="relative w-full">
													<div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
														<div
															style={{ width: "100%" }}
															className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
														></div>
													</div>
												</div>
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex items-center gap-2">
											<Circle className="h-3 w-3 text-green-500" />
											Accepted
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
										<a
											href="#pablo"
											className="text-blueGray-500 block py-1 px-3"
											// onclick="openDropdown(event,'table-dark-1-dropdown')"
										>
											<MoreHoriz />
										</a>
										<div
											className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
											// id="table-dark-1-dropdown"
										>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Another action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Something else here
											</a>
											<div className="h-0 my-2 border border-solid border-blueGray-100"></div>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Seprated link
											</a>
										</div>
									</td>
								</tr>
								<tr>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
										<Image
											src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
											className="bg-white rounded-full border"
											height="48"
											width="48"
											alt="..."
										/>
										<span className="ml-3 font-bold"> Alena Mango </span>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										25/08/2021
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										Human Resources
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>Completing Documents</div>
											<div className="flex items-center">
												<span className="mr-2">80%</span>
												<div className="relative w-full">
													<div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
														<div
															style={{ width: "80%" }}
															className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
														></div>
													</div>
												</div>
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex items-center gap-2">
											<Circle className="h-3 w-3 text-gray-400" />
											No Answer
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
										<a
											href="#pablo"
											className="text-blueGray-500 block py-1 px-3"
											// onclick="openDropdown(event,'table-dark-1-dropdown')"
										>
											<MoreHoriz />
										</a>
										<div
											className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
											// id="table-dark-1-dropdown"
										>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Another action
											</a>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Something else here
											</a>
											<div className="h-0 my-2 border border-solid border-blueGray-100"></div>
											<a
												href="#pablo"
												className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
											>
												Seprated link
											</a>
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
