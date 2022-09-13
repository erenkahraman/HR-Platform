import { Topbar, Sidebar } from ".";
const { default: Head } = require("next/head");
import { useState } from "react";
import {BsArrowLeftShort} from "react-icons/bs";
import {HiOutlineMenu} from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import extramusLogoWhite from "../../public/extramusLogoWhite.png";
import { ArrowDropDown, NotificationsNoneOutlined } from "@mui/icons-material";


const Layout = ({ children }) => {
	const [open, setOpen] =useState(true);
	return (
		<>
			<Head>
				<title>HR Project</title>
			</Head>
			<main>
				{/* Aici */}
				<div className="flex top-0 z-50 ">
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
			<HiOutlineMenu className="md:hidden lg:hidden text-white text-3xl"
			onClick={()=>setOpen(!open)}
			/>	
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























				</div>
				{/* Main Container */}
				<div className="sm:static flex relative text-[#4F4F4F] ">
					{/* Left Side */}
					
					<div className={`  h-full top-16 drop-shadow-xl w-48 sm:w-40 bg-white ${open ? "sm:absolute" :"sm:hidden"} ` }>     
						<Sidebar />
					</div> 
					
					



					
					{/* Right Side */}
					<div className="flex flex-[5] p-4 bg-gradient-to-r from-sky-50 to-purple-50">
						{children}
					</div>
				</div>
			</main>
		</>
	);
};

export default Layout;
