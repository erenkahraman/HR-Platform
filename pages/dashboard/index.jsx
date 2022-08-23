import {
	ArrowForward,
	NotificationAddOutlined,
	UploadFileOutlined,
	AnnouncementOutlined,
	Cancel,
	Verified
} from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import dashboardImage from "../../public/dashboardImage.png";
import { Reminder } from "../../components/Reminder";
import Feed from "../../components/Feed/Feed";
import FeedSchedule from "../../components/Feed/FeedSchedule"
import Upcoming from "../../components/Upcoming/Upcoming";
import Popup from "reactjs-popup"


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
				</div>git
			</div>
			{/* Button Container*/}
			<div className="flex gap-3">
				{/* Add Post Button */}
				<Popup contentStyle={{ background: "#0B3768", borderRadius: "0.25rem" }} trigger={<button className="bg-white flex w-[25rem] p-3 rounded-md border-2 items-center justify-start gap-3">
					<div className="buttonImage text-[#2F80ED] bg-sky-100 flex items-center justify-center h-12 w-12 rounded-full">
						<UploadFileOutlined />
					</div>
					<div className="buttonText mb-1">
						Add New Post
						<p className="text-xs">
							Start adding your post to inform another employee
						</p>
					</div>
				</button>} position="bottom" >
					{/* NEW POST */}
					<div className="m-2 p-4">
						<div>
							<h6 className="font-semibold text-xl text-white pt-2 pb-4">New Post</h6>
							<div className="flex flex-row mx-2 mt-2 mb-4">
								<h2 className="font-semibold text-l text-white ">By: </h2>
								<input type="text" class="rounded border-none bg-[#e0f2fe] text-black h-7 w-72 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm" placeholder="Type your name..." required />
							</div>
						</div>

						{/* INFORMATION BOX */}
						<div className="flex flex-col">
							<div className="pb-2 pt-6">
								<input type="text" class="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm" placeholder="Type the subject..." required />
							</div>
							<div>
								<textarea class="rounded border-none bg-[#e0f2fe] text-black h-72 w-80 ml-2 pl-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm" placeholder="Type the information..." required />
							</div>
						</div>

						{/* BUTTOM PART */}
						<div className="flex flex-row pt-20">
							<input type='date' class="rounded border-none bg-[#e0f2fe] text-#0B3768 h-7 ml-2 " />
							<div className="pl-20">
								<button className="pr-2 "> <Cancel className=" fill-[#e0f2fe] hover:fill-[#991b1b]" /> </button>
								<button> <Verified className="fill-[#e0f2fe] hover:fill-[#15803d]" /> </button>
							</div>
						</div>
					</div>

				</Popup>

				{/* Add Reminder Button */}
				<Popup contentStyle={{ background: "#0B3768", borderRadius: "0.25rem" }} trigger={<button className="bg-white flex w-[25rem] p-3 rounded-md border-2 items-center justify-start gap-3">
					<div className="buttonImage text-[#2f7e1b] bg-green-100 flex items-center justify-center h-12 w-12 rounded-full">
						<NotificationAddOutlined />
					</div>
					<div className="buttonText mb-1">
						Add New Reminder
						<p className="text-xs">
							Start adding your reminder for daily reminder
						</p>
					</div>
				</button>} position="bottom" >
					{/* NEW POST */}
					<div className="m-2 p-4">
						<div>
							<h6 className="font-semibold text-xl text-white pt-2 pb-4">New Remainder</h6>
							<div className="flex flex-row mx-2 mt-2 mb-4">
								<h2 className="font-semibold text-l text-white ">By: </h2>
								<input type="text" class="rounded border-none bg-[#e0f2fe] text-black h-7 w-72 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm" placeholder="Type your name..." required />
							</div>
						</div>

						{/* INFORMATION BOX */}
						<div className="flex flex-col">
							<div className="pb-2 pt-6">
								<input type="text" class="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm" placeholder="Type the subject..." required />
							</div>
							<div>
								<textarea class="rounded border-none bg-[#e0f2fe] text-black h-72 w-80 ml-2 pl-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm" placeholder="Type the information..." required />
							</div>
						</div>

						{/* BUTTOM PART */}
						<div className="flex flex-row pt-20">
							<input type='date' class="rounded border-none bg-[#e0f2fe] text-#0B3768 h-7 ml-2 " />
							<div className="pl-20">
								<button className="pr-2 "> <Cancel className=" fill-[#e0f2fe] hover:fill-[#991b1b]" /> </button>
								<button> <Verified className="fill-[#e0f2fe] hover:fill-[#15803d]" /> </button>
							</div>
						</div>
					</div>
				</Popup>

				{/* Add Notification Button */}
				<Popup contentStyle={{ background: "#0B3768", borderRadius: "0.25rem" }} trigger={<button className="bg-white flex w-[25rem] p-3 rounded-md border-2 items-center justify-start gap-3">
					<div className="buttonImage text-[#ba1313] bg-red-100 flex items-center justify-center h-12 w-12 rounded-full">
						<AnnouncementOutlined />
					</div>
					<div className="buttonText mb-1">
						Send a notification
						<p className="text-xs">
							Send important messages to colleagues
						</p>
					</div>
				</button>} position="bottom" >
					{/* NEW POST */}
					<div className="m-2 p-4">
						<div>
							<h6 className="font-semibold text-xl text-white pt-2 pb-4">Send a notifcation</h6>
							<div className="flex flex-row mx-2 mt-2 mb-4">
								<h2 className="font-semibold text-l text-white ">By: </h2>
								<input type="text" class="rounded border-none bg-[#e0f2fe] text-black h-7 w-72 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm" placeholder="Type your name..." required />
							</div>
						</div>

						{/* INFORMATION BOX */}
						<div className="flex flex-col">
							<div className="pb-2 pt-6">
								<input type="text" class="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm" placeholder="Type the subject..." required />
							</div>
							<div>
								<textarea class="rounded border-none bg-[#e0f2fe] text-black h-72 w-80 ml-2 pl-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm" placeholder="Type the information..." required />
							</div>
						</div>

						{/* BUTTOM PART */}
						<div className="flex flex-row pt-20">
							<input type='date' class="rounded border-none bg-[#e0f2fe] text-#0B3768 h-7 ml-2 " />
							<div className="pl-20">
								<button className="pr-2 "> <Cancel className=" fill-[#e0f2fe] hover:fill-[#991b1b]" /> </button>
								<button> <Verified className="fill-[#e0f2fe] hover:fill-[#15803d]" /> </button>
							</div>
						</div>
					</div>
				</Popup>

			</div>

			{/* Bottom */}
			<div className="flex flex-[3] p-3 gap-3">
				{/* Left */}
				<div className="left-container flex flex-[1.5] flex-col gap-2">
					<div className="flex flex-[1.5] flex-col gap-2">
						<div className="flex items-center justify-between">
							<div className="text-xl font-semibold">What's New</div>
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
						<div className="flex flex-col gap-2 divide-y bg-white rounded-md border-2">
							<Feed />
							<Feed />
							<Feed />
						</div>
						{/* Weekly Schedule */}
					</div>
					<div className="flex flex-[1.5] flex-col gap-2">
						<div className="flex items-center justify-between">
							<div className="text-xl font-semibold">Weekly Schedule</div>
							<a
								href="./"
								className="viewAll flex items-center justify-center text-[#2F80ED]"
							>
								<div>
									{" "}
								</div>
							</a>
						</div>
						{/* Weekly Schedule Content */}
						<div className="flex flex-col gap-2 divide-y bg-white rounded-md border-2">
							<FeedSchedule />
						</div>

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

					{/* Birthday */}
					<div className="flex flex-col gap-2">
						{/* Daily Reminder Title*/}
						<div className="flex items-center justify-between">
							<div className="text-xl font-semibold">Upcoming Birthdays 🥳🍰🎉</div>
							<a
								href="./"
								className="flex items-center justify-center text-[#2F80ED]"
							>
								<div>View All (6)</div>
								<div>
									{" "}
									<ArrowForward className="text-md" />
								</div>
							</a>
						</div>

						{/* Birthday Content */}
						<div className="flex flex-col gap-3 h-fit bg-white rounded-md border-2 py-2">
							<Reminder
								color="text-purple-500"
								title="Lia Ciobanu"
								category="ICT"
								time="21 august 2022"
							/>
							<Reminder
								color="text-purple-500"
								title="Rimma Cechir"
								category="ICT"
								time="25 august 2022"
							/>
							<Reminder
								color="text-purple-500"
								title="Person"
								category="Business Analyst"
								time="1 september 2022"
							/>
							<Reminder
								color="text-purple-500"
								title="Person"
								category="Human Resurces"
								time="25 september 2022"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
}
