import { ArrowDropDown, NotificationsNoneOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import extramusLogoWhite from "../../public/extramusLogoWhite.png";
import {HiOutlineMenu} from "react-icons/hi";
import { useState } from "react";
import { Sidebar } from ".";

export default function Navbar() {
	const [open, setOpen] =useState(true);
	return (
		<div className="flex h-16 w-screen bg-[#0B3768] justify-between py-3 px-4 sm:w-screen">
			{/* Extramus Logo White*/}
			<Link href="/">
				<div className="flex items-center ml-5 hover:cursor-pointer sm:hidden  ">
                    
					<Image
						src={extramusLogoWhite}
						alt="loginImg"
						width="80"
						height="40"
					/>
					

				</div>

			</Link>			
			{/* Right Side */}
			<div className="flex items-center justify-between text-white gap-3">
				<p className="text-2xl"> │ </p>
				<div className="notificationContainer cursor-pointer relative">
					<NotificationsNoneOutlined />
					<span className="absolute rounded-full bg-red-600 w-[15px] h-[15px] top-[-1px] right-[-1px] flex items-center justify-center text-xs">
						2
					</span>
				</div>
				<Link href="/login">
					<p className="cursor-pointer">Ario Anindito</p>
				</Link>

				<ArrowDropDown className="cursor-pointer text-4xl" />
			</div>
		</div>
	);
}
