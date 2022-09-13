import { Add, Circle, MoreHoriz, SystemUpdateAlt } from "@mui/icons-material";

export default function ApplicantsList() {
	return (
		<section className="relative w-full">
			<div className="w-full mb-12">
				<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
					{/* Title Container */}
					<div className="flex justify-between rounded-t mb-0 px-4 py-3 border-0 bg-white">
						<div className="flex flex-wrap items-center">
							<div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
								<h3 className="font-semibold text-2xl">All Profiles</h3>
							</div>
						</div>
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
                                         <MoreHoriz />
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
