import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const attendence = () => {
	return (
		<section className="relative w-full">
			<div className="w-full mb-12">
				<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
					{/* Title Container */}
					<div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                <h3 className="font-semibold text-2xl">Month Attendance</h3>
                            </div>
                        </div>
                    </div>

					{/* Table */}
					<div className="block w-full overflow-x-auto ">
						<table className="items-center w-full border-collapse bg-white">
							{/* Table Head */}
							<thead>
								<tr>
									<th className="align-middle border border-solid py-3 pl-1 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										<ArrowDownwardIcon />INTERN / DATE <ArrowForwardIcon />
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										1
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										2
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										3
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										4
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										5
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										6
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										7
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										8
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										9
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										10
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										11
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										12
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										13
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										15
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										16
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										17
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										18
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										19
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										20
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										21
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										22
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										23
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										24
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										25
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										26
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										27
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										28
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										29
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										30
									</th>
									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
										31
									</th>
								</tr>
							</thead>

							{/* Table Body */}
							<tbody className="divide-y">
								<tr>
									<td className="align-middle border border-solid py-3 pl-2 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> Alessio Rocco </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> D </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
									</td>

									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
										<div className="font-bold"> P </div>
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
