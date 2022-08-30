import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from "next/link";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';


const attendence = () => {
	return (
		<section className="relative w-full">
			<div className="w-full mb-12">
				<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
					{/* Title Container */}
					<div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                <h3 className="font-semibold text-2xl">Applicant Attendance</h3>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/interns/monthAttendance">
                                <span className="hover:bg-green-400 group flex items-center rounded-md bg-green-500 text-white text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                                    <EventAvailableIcon className="text-m py-1" />
                                    Month Attendance
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
									<th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										INTERN
									</th>
									<th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										DATE
									</th>
									<th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										SITUATION
									</th>
									<th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										PRESENT
									</th>
									<th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										LATE
									</th>
									<th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										DAY OFF
									</th>
									<th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										EXCUSED LEAVE
									</th>
									<th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										SICK
									</th>
									<th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										UNEXCUSED LEAVE
									</th>
									<th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										ACTION
									</th>
								</tr>
							</thead>

							{/* Table Body */}
							<tbody className="divide-y">
								<tr>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center mt-3">
										<div className="font-bold"> Alessio Rocco </div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<input type="date" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ></input>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<select
											id="country"
											className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
										>
											<option>Present</option>
											<option>Late</option>
											<option>Day off</option>
											<option>Excused leave</option>
											<option>Sick</option>
											<option>Unexecused leave</option>
										</select>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												0
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												1
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												2
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												1
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												0
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												0
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												{/* ICONS */}
												<CheckCircleIcon className="h-6 fill-[#0b3768] hover:fill-[#15803d]" />
												<CancelIcon className="h-6 fill-[#0b3768] hover:fill-[#991b1b]" />
											</div>
										</div>
									</td>

								</tr>

								<tr>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center mt-3">
										<div className="font-bold"> Alessio Rocco </div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<input type="date" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ></input>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<select
											id="country"
											className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
										>
											<option>Present</option>
											<option>Late</option>
											<option>Day off</option>
											<option>Excused leave</option>
											<option>Sick</option>
											<option>Unexecused leave</option>
										</select>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												0
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												1
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												2
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												1
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												0
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												0
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												{/* ICONS */}
												<CheckCircleIcon className="h-6 fill-[#0b3768] hover:fill-[#15803d]" />
												<CancelIcon className="h-6 fill-[#0b3768] hover:fill-[#991b1b]" />
											</div>
										</div>
									</td>

								</tr>

								<tr>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center mt-3">
										<div className="font-bold"> Alessio Rocco </div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<input type="date" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ></input>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<select
											id="country"
											className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
										>
											<option>Present</option>
											<option>Late</option>
											<option>Day off</option>
											<option>Excused leave</option>
											<option>Sick</option>
											<option>Unexecused leave</option>
										</select>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												0
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												1
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												2
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												1
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												0
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												0
											</div>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
										<div className="flex flex-col gap-1">
											<div>
												{/* ICONS */}
												<CheckCircleIcon className="h-6 fill-[#0b3768] hover:fill-[#15803d]" />
												<CancelIcon className="h-6 fill-[#0b3768] hover:fill-[#991b1b]" />
											</div>
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
};

export default attendence;
