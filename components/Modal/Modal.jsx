import React from 'react'
import mongoose from 'mongoose'

const Modal = ({ setModalOn, setChoice, stdId }) => {

	const handleCancelClick = () => {
		setChoice(false)
		setModalOn(false)
	}

	const calculateWeeks = (start, end) => {
		const msInWeek = 1000 * 60 * 60 * 24 * 7;
		return Math.round(Math.abs(Date.parse(end) - Date.parse(start)) / msInWeek);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const id = new mongoose.Types.ObjectId()
		const intern = {
			_id: id,
			startDate: event.target.startDate.value,
			endDate: event.target.endDate.value,
			durationInWeeks: calculateWeeks(startDate,endDate),
			departement: event.target.department.value,
			position: event.target.position.value,
			student: stdId
		};
		const JSONintern = JSON.stringify(intern);
		const endpointIntern = '/api/intern';
		const endpointstudent = `/api/student/${stdId}`;
		const optionsIntern = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
			},
			body: JSONintern,
		};
		const optionsStudent = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				intern : id
			}),
		};
		await fetch(endpointstudent, optionsStudent);
		await fetch(endpointIntern, optionsIntern);
		setChoice(true)
		setModalOn(false)
	}

	return (

		<div>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>


				<div className="   bg-zinc-200 opacity-90 fixed inset-0 z-50   ">

					<div className="flex h-screen justify-center items-center ">

						<div className="flex-col justify-center  bg-[#0B3768] py-12 px-24 border-4  rounded-xl ">

							<div className="flex  text-lg  text-white ml-24  mb-4" >Introduction </div>

							<div className="flex  gap-2 mb-4">
								<label htmlFor="startDate" className="block text-sm text-white w-32 ">
									Start Date
								</label>
								<input
									type="date"
									name="startDate"
									required
									id="startDate"
									className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
								/>
							</div>

							<div className="flex gap-2 mb-4">
								<label htmlFor="endDate" className="block text-sm text-white w-32 ">
									End Date
								</label>
								<input
									type="date"
									name="endDate"
									required
									id="endDate"
									className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
								/>
							</div>

							<div className="flex  gap-2 mb-4">
								<label htmlFor="department" className="block text-sm text-white w-32">
									Department
								</label>
								<select
									name="department"
									id="department"
									className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								>
									<option>HR</option>
									<option>ICT</option>
									<option>DA</option>
								</select>
							</div>

							<div className="flex  gap-2 mb-8">
								<label htmlFor="position" className="block text-sm text-white w-32">
									Position
								</label>
								<select
									name="position"
									id="position"
									className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								>
									<option>Position1</option>
									<option>Position2</option>
									<option>Position3</option>
								</select>
							</div>

							<div className="flex  flex-row ml-6">
								<button onClick={handleCancelClick} className=" rounded px-4 py-2 text-white  bg-blue-400 ">Cancel</button>
								<button type="submit"  className="rounded px-4 py-2 ml-4 text-white bg-green-400 ">Save and Move to Interns</button>

							</div>

						</div>
					</div>
				</div>
			</form>
		</div>

	);
}

export default Modal