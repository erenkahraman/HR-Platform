import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

const FeedSchedule = () => {

	const [weeklySchedule, setWeeklySchedule] = useState([])
	const [departmentNames, setDepartmentNames] = useState([])
	const [morningDepartments, setMorningDepartments] = useState([])
	const [afternoonDepartments, setAfternoonDepartments] = useState([])

	const token = cookie.get("token");

	useEffect(() => {
		const asyncRequest = async () => {
			try {
				const config = {
					headers: {
						"Content-Type": "application/json",
					},
				};
				const { data } = await axios.get(
					`/api/weeklySchedule`,
					{ params: { token: token } },
					config
				);

				const weeklyScheduleGroupedByDepartment = data.reduce((departments, item) => {
					const department = (departments[item.department] || []);
					department.push(item);
					departments[item.department] = department;
					return departments;
				}, {});
				setWeeklySchedule(weeklyScheduleGroupedByDepartment)

				const departmentNames = Object.keys(weeklyScheduleGroupedByDepartment);
				setDepartmentNames(departmentNames)

				const clonedDepartmentNamesForMorning = departmentNames.slice(0)
				const clonedDepartmentNamesForAfternoon = departmentNames.slice(0)

				setMorningDepartments(clonedDepartmentNamesForMorning.splice(0, departmentNames.length / 2))
				setAfternoonDepartments(clonedDepartmentNamesForAfternoon.splice(departmentNames.length / 2))

			} catch (e) {
				console.error(e);
			}
		};
		asyncRequest();
	}, []);



	const read = () => {
		confirmAlert({
			title: <strong>Schedule</strong>,
			message: <div className="h-96 overflow-y-scroll "><p>
				{/* <br />Morning shift from 8:00 to 13:00: (23) */}

				<div>
					{departmentNames.map((eachDepartmentName) => (
						<div>
							<br />
							<br />{eachDepartmentName + ": " + weeklySchedule[eachDepartmentName].length}
							{weeklySchedule[eachDepartmentName].map((eachIntern) => (
								<p>{"• " + eachIntern.student.firstName + " " + eachIntern.student.lastName} </p>
							))}
						</div>
					))}
				</div>

				{/* <br />	
			<br />Human Resources: 4
			<br />• Katerina Svarcova
			<br />• Klara Tlaskalova
			<br />• Isata Sajor Bah
			<br />• Andreea Zuralii

			<br />
			<br />Information Technology: 1
			0
			<br />• Anouar Abou-er-Raja
			<br />• Sajjad Khan
			<br />• Alexandru Szoke-Manea
			<br />• Sergiu Mateiu
			<br />• Lia Ciobanu
			<br />• Rimma Cechir
			<br />• Oladimeji Rahim Aremu
			<br />• Sinem Turkcu
			<br />• Murat Orhun
			
			<br />
			<br />User Experience Designer: 2
			<br />• Chidiebube Chiemela Samuel
			<br />• Hellen Truong

			<br />
			<br />Digital Marketing: ​​​​5
			<br />• Burak Colak
			<br />• Metehan Duzcan
			<br />• Caterinciuc Vadim
			<br />• Sefa Aydemir
			<br />• Elif Basak Cobantepesi
			
			<br />
			<br />Copy Writer: 1
			<br />• Oyku Dilekci
			
			<br />
			<br />Business Lawyer: 1
			<br />• Sibusiso Dominic Mabaso
			
			<br />
			<br />Afternoon shift from 13:00 to 18:00: (19)
			<br />
			<br />Human Resources: 4
			<br />• Marvellous Oreoluwa Oseyemi
			<br />• Blessing Chukwu Ogele
			<br />• Riski Oktarian
			<br />• Isata Sajor Bah
			<br />
			<br />Data Analyst: 4
			<br />• Daniil Podtesov
			<br />• Bedriye Ekin Uslu
			<br />• Rustem Mammedov
			<br />• Mikolaj Malec
			<br />
			Business Project Management: 4
			<br />• Sanvir Kaur
			<br />• Hafiza Noorie
			<br />• Julia Wielgus
			<br />• Joel Antunes Goncalves
			<br />
			<br />European Project manager: 5
			<br />• Fidelix Ayobami
			<br />• Beril Yazar
			<br />• Hatice Cetindere
			<br />• Adriana Goncalves
			<br />• Helene Jensen
			<br />
			<br />Architecture and Urban Design: 1
			<br />• Bilge Bahar Saatci
			<br />
			<br />Information Technology: 1 (9:00 - 16:00)
			<br />• Eneada Sulaj */}

			</p></div>,
			buttons: [
				{
					label: 'OK',
					onClick: () => alert('Click Yes')
				},
				{
					label: 'Cancel',
					onClick: () => alert('Click No')
				}
			]

		});
	}


	return (
		<div className="flex m-2 py-4">
			<div className="flex flex-[1] flex-col gap-2 p-2">
				<div className="text-sm font-semibold">10 August 2022</div>
				<div className="text-xs font-light">
					<div>posted by</div>
					<div>Antonio Gallo</div>
				</div>
			</div>
			<div className="flex flex-[3] flex-col gap-2 p-2">
				<div className="text-sm font-semibold">
					Schedule for this week
				</div>

				<div className="text-xs font-light h-72">
					<p className="h-72" style={{ overflow: "hidden" }}>
						<div className=''>
							{/* {departmentNames.map((eachDepartmentName) => (
								<div>
									<br />
									<br />{eachDepartmentName + ": " + weeklySchedule[eachDepartmentName].length}
									{weeklySchedule[eachDepartmentName].map((eachIntern) => (
										<p>{"• " + eachIntern.student.firstName + " " + eachIntern.student.lastName} </p>
									))}
								</div>
							))} */}
							<div className="flex justify-center gap-8 my-1">
								<div>
									<h3>Morning Shift:</h3>
									{morningDepartments.map((eachDepartmentName) => (
										<div>
											<br />
											<br />{eachDepartmentName + ": " + weeklySchedule[eachDepartmentName].length}
											{weeklySchedule[eachDepartmentName].map((eachIntern) => (
												<p>{"• " + eachIntern.student.firstName + " " + eachIntern.student.lastName} </p>
											))}
										</div>
									))}

								</div>

								<div>
									<h3>Afternoon Shift:</h3>

									{afternoonDepartments.map((eachDepartmentName) => (
										<div>
											<br />
											<br />{eachDepartmentName + ": " + weeklySchedule[eachDepartmentName].length}
											{weeklySchedule[eachDepartmentName].map((eachIntern) => (
												<p>{"• " + eachIntern.student.firstName + " " + eachIntern.student.lastName} </p>
											))}
										</div>
									))}
								</div>
							</div>

						</div>
					</p>
				</div>
			</div>
			<button onClick={read} className="flex flex-[1] p-2">
				<div className="flex h-fit text-sm font-semibold underline cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ...">
					Read More
				</div>
			</button>
		</div>
	);
};

export default FeedSchedule;

