import { ArrowDropDown, NotificationsNoneOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import extramusLogoWhite from "../../public/extramusLogoWhite.png";
import Popup from "reactjs-popup"
import Notification from "../Feed/Notification";

export default function Navbar() {
	return (
		<div className="flex h-16 bg-[#0B3768] justify-between py-3 px-4">
			{/* Extramus Logo White*/}
			<Link href="/dashboard">
				<div className="flex items-center ml-16 hover:cursor-pointer ">
					<Image
						src={extramusLogoWhite}
						alt="loginImg"
						width="80"
						height="40"
					/>
				</div>
			</Link>
			{/* Right Side */}
			<div className="flex items-center justify-between text-white gap-3 mr-5">
				<Popup contentStyle={{ borderRadius:"30px",margin:"14px"}} trigger={<button className="cursor-poiner relative">
					<NotificationsNoneOutlined />
					<span className="absolute rounded-full bg-red-600 w-[15px] h-[15px] top-[-1px] right-[-1px] flex items-center justify-center text-xs">
						2
					</span>
				</button>} position="bottom center">
					<div className="">
						{/* <h2 className="border-4 rounded-xl text-black font-bold text-xl bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-50 text-semibold p-2">Notifications:</h2> */}
						{/* <div className="h-0.5 bg-[gray]/75"></div> */}
						<Notification />
						<Notification />
						<Notification />
					</div>

				</Popup>
				<p className="text-2xl"> │ </p>
				<Link href="/#">
					<p className="cursor-pointer ">Ario Anindito</p>
				</Link>

				<Popup contentStyle={{ marginTop:"10px"}} trigger={<button><ArrowDropDown className="cursor-pointer text-4xl" /></button>} position="bottom center" >
					<div className="bg-[#0b3768] font-semibold rounded-md p-2 text-white transition ease-in-out delay-150 hover:text-[#0b3768] hover:bg-gray-100 hover:font-bold hover:-translate-y-0.5 hover:scale-90 hover: duration-200 ...">
						<Link href="/login">Log Out</Link>
					</div>
				</Popup>
				
			</div>
		</div>
	);
}

// className="cursor-pointer relative"
// <NotificationsNoneOutlined />
// <span className="absolute rounded-full bg-red-600 w-[15px] h-[15px] top-[-1px] right-[-1px] flex items-center justify-center text-xs">
// 	2
// </span>

{/* <div className="bg-[#0B3768] text-white">
						<h2 className="text-xl text-semibold p-2">Notifications</h2>
						<div className="h-0.5 bg-white"></div>
						<Notification />
						<Notification />
						<Notification />
					</div> */}