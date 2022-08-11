import {
	ArrowForward,
	NotificationAddOutlined,
	UploadFileOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import dashboardImage from "../../public/dashboardImage.png";
import { Reminder } from "../../components/Reminder";
import Feed from "../../components/Feed/Feed";
import Upcoming from "../../components/Upcoming/Upcoming";

//!comment

export default function Dashboard() {
	return (
		<div className="flex flex-col w-full">
			{/* Top */}
			<div className="flex flex-[1]">
				{/* Image Container */}
				<div className="flex flex-[1] items-center justify-center">
					<Image src={dashboardImage} alt="test" width="180" height="180" />
				</div>
				{/* Right */}
				<div className="dashboardTopRight flex flex-[4] flex-col justify-center gap-4">
					{/* Title */}
					<div className="flex flex-col gap-2">
						<p className="text-4xl font-semibold">Ciao, Ario!</p>
						<p className="text-sm">
							Welcome Back! You have 5{" "}
							<a className="underline" href="./">
								notifications.
							</a>
						</p>
					</div>

					{/* Button Container*/}
					<div className="flex gap-3">
						{/* Add Post Button */}
						<a
							href="./"
							className="bg-white flex w-[25rem] p-3 rounded-md border-2 items-center justify-start gap-3"
						>
							<div className="buttonImage text-[#2F80ED] bg-sky-100 flex items-center justify-center h-12 w-12 rounded-full">
								<UploadFileOutlined />
							</div>
							<div className="buttonText mb-1">
								Add New Post
								<p className="text-xs">
									Start adding your post to inform another employee
								</p>
							</div>
						</a>
						{/* Add Reminder Button */}
						<a
							href="./"
							className="bg-white flex w-[25rem] p-3 rounded-md border-2 items-center justify-start gap-3"
						>
							<div className="buttonImage text-[#2f7e1b] bg-green-100 flex items-center justify-center h-12 w-12 rounded-full">
								<NotificationAddOutlined />
							</div>
							<div className="buttonText mb-1">
								Add New Reminder
								<p className="text-xs">
									Start adding your reminder for daily reminder
								</p>
							</div>
						</a>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className="flex flex-[3] p-3 gap-3">
				{/* Left */}
				<div className="flex flex-[1.5] flex-col gap-2">
					<div className="flex items-center justify-between">
						<div className="text-xl font-semibold">What&apos;s New</div>
						<a
							href="./"
							className="viewAll flex items-center justify-center text-[#2F80ED]"
						>
							<div>View All (18)</div>
							<div>
								{" "}
								<ArrowForward className="text-md" />
							</div>
						</a>
					</div>
					{/* What's New Content */}
					<div className="flex flex-col gap-2 divide-y bg-white h-full rounded-md border-2">
						<Feed />
						<Feed />
						<Feed />
						<Feed />
					</div>
				</div>

				{/* Right */}
				<div className="flex flex-[1] flex-col gap-3">
					{/* Daily Reminder */}
					<div className="flex flex-col gap-2">
						{/* Daily Reminder Title*/}
						<div className="flex items-center justify-between">
							<div className="text-xl font-semibold">Daily Reminder</div>
							<a
								href="./"
								className="flex items-center justify-center text-[#2F80ED]"
							>
								<div>View All (12)</div>
								<div>
									{" "}
									<ArrowForward className="text-md" />
								</div>
							</a>
						</div>

						{/* Daily Reminder Content */}
						<div className="flex flex-col gap-3 h-fit bg-white rounded-md border-2 py-2">
							<Reminder
								color="text-red-500"
								title="HR Meeting"
								category="General"
								time="Today"
							/>
							<Reminder
								color="text-yellow-500"
								title="HR Interview: Wilson"
								category="Interview"
								time="10 September 2021"
							/>
							<Reminder
								color="text-yellow-500"
								title="Documents Update: Samara"
								category="Applicants"
								time="10 September 2021"
							/>
							<Reminder
								color="text-green-500"
								title="Update Calendar and Applicant Details"
								category="General"
								time="Everyday"
							/>
							<Reminder
								color="text-green-500"
								title="Check Applicant Documents"
								category="General"
								time="Everyday"
							/>
						</div>
					</div>

					{/* Arrival Departure */}
					<div className="flex flex-col gap-2">
						{/* Bottom Right Side - Title */}
						<div className="flex items-center justify-between">
							<div className="text-xl font-semibold">
								Upcoming Arrival and Departure
							</div>
							<a
								href="./"
								className="flex items-center justify-center text-[#2F80ED]"
							>
								<div>View All (8)</div>
								<div>
									{" "}
									<ArrowForward className="text-md" />
								</div>
							</a>
						</div>

						{/* Arrival Departure Content*/}
						<div className="flex flex-col gap-3 h-fit bg-white rounded-md border-2 py-2 px-4">
							<Upcoming
								name="Marcus Botosh"
								department="ICT"
								status="Arriving"
								time="02 September 2022"
							/>
							<Upcoming
								name="Talan Carder"
								department="Human Resources"
								status="Departing"
								time="03 September 2022"
							/>
							<Upcoming
								name="Jordyn Dias"
								department="Project Management"
								status="Departing"
								time="05 September 2022"
							/>
							<Upcoming
								name="Cooper Gouse"
								department="Business Analyst"
								status="Arriving"
								time="07 September 2022"
							/>
							<Upcoming
								name="Desirae Stanton"
								department="ICT"
								status="Arriving"
								time="10 September 2022"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
