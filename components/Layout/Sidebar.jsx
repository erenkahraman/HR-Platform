import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

import {
	CalendarMonthOutlined,
	DashboardOutlined,
	FlightLandOutlined,
	FlightTakeoffOutlined,
	GroupOutlined,
	InsertDriveFileOutlined,
	List,
} from "@mui/icons-material";

export default function Sidebar() {
	const router = useRouter();

	const Menus = [
		{
			title: "Dashboard",
			href: "/dashboard",
			icon: <DashboardOutlined />,
			isOn: false,
		},
		{ title: "APPLICANTS", isSeperator: true },
		{ title: "List", href: "/applicants/list", icon: <List />, isOn: false },
		{
			title: "Interview Schedule",
			href: "/dashboard",
			icon: <CalendarMonthOutlined />,
			isOn: false,
		},
		{
			title: "Documents",
			href: "/applicants/documents",
			icon: <InsertDriveFileOutlined />,
			isOn: false,
		},
		{
			title: "Arrival",
			href: "/dashboard",
			icon: <FlightLandOutlined />,
			isOn: false,
		},
		{ title: "INTERNS", isSeperator: true },
		{ title: "List", href: "/dashboard", icon: <List />, isOn: false },
		{
			title: "Documents",
			href: "/dashboard",
			icon: <InsertDriveFileOutlined />,
			isOn: false,
		},
		{
			title: "Profile",
			href: "/dashboard",
			icon: <GroupOutlined />,
			isOn: false,
		},
		{ title: "END INTERNSHIP", isSeperator: true },
		{ title: "List", href: "/dashboard", icon: <List />, isOn: false },
		{
			title: "Documents",
			href: "/dashboard",
			icon: <InsertDriveFileOutlined />,
			isOn: false,
		},
		{
			title: "Departure",
			href: "/dashboard",
			icon: <FlightTakeoffOutlined />,
			isOn: false,
		},
	];

	const sideBarListItem = () => {
		let result =
			"flex items-center px-6 py-2 gap-2 hover:text-[#2F80ED] hover:bg-sky-50";

		return result;
	};

	const sideBarListSeperator = () => {
		let result = "flex items-center px-6 py-2 mt-4 text-gray-700";

		return result;
	};

	return (
		<div className="sidebar flex w-full h-[calc(100vh_-_64px)] text-gray-400">
			<div className="sidebarWrapper w-full mt-4">
				<ul className="sidebarList text-sm font-light">
					{Menus.map((menu, index) => (
						<li
							key={index}
							// onClick={() => {
							// 	isOn == !isOn;
							// }}
						>
							{menu.isSeperator === undefined ? (
								<Link href={menu.href}>
									<a
										className={
											menu.isOn === false
												? sideBarListItem()
												: sideBarListItem() + " text-[#2F80ED] bg-sky-50"
										}
									>
										{menu.icon}
										<p>{menu.title}</p>
									</a>
								</Link>
							) : (
								<a className={sideBarListSeperator()}>{menu.title}</a>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
