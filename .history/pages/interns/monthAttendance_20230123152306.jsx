import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UndoIcon from '@mui/icons-material/Undo';
import { useEffect } from 'react';
import { Link } from 'react-bootstrap-icons';

function prevAttendance(){
	const [data, setData] = useState([]);
	const [isloading, setLoading] = useState(true);
	const [date, setDate] = useState("");
	const [status, setStatus] = useState("");
	const [intern, setIntern] = useState();
	const [open, setOpen] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);
	const [openAlertIncludedDate, setOpenAlertIncludedDate] = useState(false);
	const [editAttendanceModel, setAttendanceEditModel] = useState(false);
	const [dateIncluded, setDateIncluded] = useState(false);
	const token = cookie.get("token");
	const [searchedVal, setSearchedVal] = useState("");
	
	const { filteredData } = useTableSearch({ data, searchedVal });
	
	
}

const attendance = async () => {
	setOpen(true);
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.get(
			`/api/intern/attendance`,
			{ params: { token: token } },
			config
		);
		setData(data);
		setOpen(false);
	} catch (e) {
		console.error(e);
		setOpen(false);
	}
};


const handleEditAttendanceSubmit = async (e) => {
	e.preventDefault();
	setOpen(true);
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.put(
			`/api/intern/attendance`,
			{ date, status, intern },
			config
		);
		setOpen(false);
		setAttendanceEditModel(false);
		setOpenAlert(true);
	} catch (e) {
		console.error(e);
		setOpen(false);
		setAttendanceEditModel(false);
	}
};

const handleDeleteAttendance = async (id) => {
	setOpen(true);
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.delete(
			`/api/intern/attendance`,
			{ params: { id: id } },
			config
		);
		setOpen(false);
		setOpenAlert(true);
	} catch (e) {
		console.error(e);
		setOpen(false);
	}
};

const handleSearch = (e) => {
	setSearchedVal(e.target.value);
};

const handleUndo = async () => {
	setOpen(true);
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.get(
			`/api/intern/attendance`,
			{ params: { token: token } },
			config
		);
		setData(data);
		setLoading(false);
		setOpen(false);
	} catch (e) {
		console.error(e);
		setLoading(false);
		setOpen(false);
	}
};

const handleDateIncluded = async (date) => {
	setOpen(true);
	try {
		const config = {
			headers: {

				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.get(
			`/api/intern/attendance`,
			{ params: { date: date } },
			config
		);
			
		if (data.length > 0) {
			setDateIncluded(true);
			setOpenAlertIncludedDate(true);
		} else {
			setDateIncluded(false);
			setOpenAlertIncludedDate(false);
		}	
		setData(data);
		setLoading(false);
		setOpen(false);
	} catch (e) {
		console.error(e);
		setLoading(false);
		setOpen(false);
	}
};

const handleDateIncludedClose = () => {
	setOpenAlertIncludedDate(false);
};

const table = () => {
	return (
		<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
			<div className="rounded-t mb-0 px-4 py-6 border-0">
				<div className="flex flex-wrap items-center">
					<div className="relative w-full px-4 max-w-full flex-grow flex-1">
						<h3 className="font-semibold text-lg text-blueGray-700">
							Attendance
						</h3>
					</div>
					<div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
						<button
							className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => setAttendanceModel(true)}
						>
							Add Attendance
						</button>
					</div>
				</div>
			</div>
			<div className="block w-full overflow-x-auto">
				{/* Projects table */}	
				<table className="items-center w-full bg-transparent border-collapse">
					<thead>
						<tr>

							<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
								Date
							</th>
							<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
								Attendance
							</th>
							<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item) => (
							<tr key={item._id}>
								<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
									{item.date}
								</th>
								<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
									{item.attendance}
								</td>
								<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
									<button
										className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => deleteAttendance(item._id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

// const attendence = () => {
// 	return (
// 		<section className="w-full">
// 			<div className=" mb-12">
// 				<div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
// 					{/* Title Container */}
// 					<div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
// 						<div className="flex flex-wrap items-center">
// 							<div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
// 								<h3 className="font-semibold text-2xl">Month Attendance</h3>
// 							</div>
// 						</div>
// 						<form className="flex flex-r justify-between">
// 							<div className="relative w-full">
// 								<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
// 									<svg aria-hidden="true" className="w-5 h-5 text-white-500 dark:text-white-400" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path strokeWidth="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
// 								</div>
// 								<input type="text" id="simple-search" className="rounded border-none bg-[#0B3768]/75 px-10 text-white h-10 placeholder:italic placeholder:text-white/30 placeholder:text-sm" placeholder="Search by name.." required />
// 							</div>
// 							<button type="submit" className="w-10 px-2 rounded border-none bg-blue-100 h-10 ml-1 mr-2 hover:bg-[#0B3768]/75 ">
// 								<svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
// 								<span className="sr-only">Search</span>
// 							</button>
// 						</form>
// 					</div>



// 					{/* Table */}
// 					<div className="block w-full overflow-x-auto ">
// 						<table className="items-center w-full border-collapse bg-white">
// 							{/* Table Head */}
// 							<thead>
// 								<tr>
// 									<th className="align-middle border border-solid py-3 pl-1 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										<ArrowDownwardIcon />INTERN / DATE <ArrowForwardIcon />
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										1
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										2
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										3
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										4
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										5
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										6
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										7
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										8
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										9
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										10
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										11
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										12
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										13
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										15
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										16
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										17
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										18
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										19
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										20
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										21
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										22
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										23
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										24
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										25
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										26
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										27
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										28
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										29
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										30
// 									</th>
// 									<th className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
// 										31
// 									</th>
// 								</tr>
// 							</thead>

// 							{/* Table Body */}
// 							<tbody className="divide-y">
// 								<tr>
// 									<td className="align-middle border border-solid py-3 pl-2 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> Alessio Rocco </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> D </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 									<td className="align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
// 										<div className="font-bold"> P </div>
// 									</td>

// 								</tr>

// 							</tbody>
// 						</table>
// 					</div>

// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// return (
// 	<>
// 		<Dialog

// 			open={open}
// 			TransitionComponent={Transition}
// 			keepMounted
// 			onClose={handleClose}
// 			aria-labelledby="alert-dialog-slide-title"
// 			aria-describedby="alert-dialog-slide-description"
// 		>
// 			<DialogTitle id="alert-dialog-slide-title">
// 				{"Loading..."}
// 			</DialogTitle>
// 			<DialogContent>
// 				<DialogContentText id="alert-dialog-slide-description">
// 					<CircularProgress />
// 				</DialogContentText>
// 			</DialogContent>
// 		</Dialog>
// 		<Dialog

// 			open={openAlert}
// 			TransitionComponent={Transition}
// 			keepMounted
// 			onClose={handleClose}
// 			aria-labelledby="alert-dialog-slide-title"
// 			aria-describedby="alert-dialog-slide-description"
// 		>
// 			<DialogTitle id="alert-dialog-slide-title">
// 				{"Success"}
// 			</DialogTitle>
// 			<DialogContent>
// 				<DialogContentText id="alert-dialog-slide-description">
// 					Successfully Updated
// 				</DialogContentText>
// 			</DialogContent>
// 			<DialogActions>
// 				<Button onClick={handleUndo} color="primary">
// 					Undo
// 				</Button>
// 				<Button onClick={handleClose} color="primary">
// 					Close
// 				</Button>
// 			</DialogActions>
// 		</Dialog>
// 		<Dialog

// 			open={openAlertIncludedDate}
// 			TransitionComponent={Transition}
// 			keepMounted
// 			onClose={handleDateIncludedClose}
// 			aria-labelledby="alert-dialog-slide-title"
// 			aria-describedby="alert-dialog-slide-description"
// 		>
// 			<DialogTitle id="alert-dialog-slide-title">
// 				{"Warning"}
// 			</DialogTitle>
// 			<DialogContent>
// 				<DialogContentText id="alert-dialog-slide-description">
// 					Attendance already included for this date
// 				</DialogContentText>
// 			</DialogContent>
// 			<DialogActions>
// 				<Button onClick={handleDateIncludedClose} color="primary">
// 					Close
// 				</Button>
// 			</DialogActions>
// 		</Dialog>
// 		<div className="flex flex-wrap">
// 			<div className="w-full mb-12 px-4">
// 				<CustomTabs

// 					title="Attendance:"
// 					headerColor="blueGray"
// 					tabs={[
// 						{
// 							tabName: "Attendance",
// 							tabIcon: CalendarToday,
// 							tabContent: (
// 								<Attendance
// 									data={data}
// 									loading={loading}
// 									handleDateIncluded={handleDateIncluded}
// 									dateIncluded={dateIncluded}
// 								/>
// 							),
// 						},
// 						{
// 							tabName: "Month Attendance",
// 							tabIcon: CalendarToday,
// 							tabContent: (
// 								<MonthAttendance

// 									data={data}
// 									loading={loading}
// 									handleDateIncluded={handleDateIncluded}
// 									dateIncluded={dateIncluded}
// 								/>
// 							),
// 						},
// 					]}
// 				/>
// 			</div>
// 		</div>
// 	</>
// );


export default attendance;
