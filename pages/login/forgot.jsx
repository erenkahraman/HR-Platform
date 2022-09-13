import Image from "next/image";
import React, { useState } from "react";
import forgotImage from "../../public/forgotimg.jpg";
import extramusLogo from "../../public/extramusLogo.png";
import Link from "next/link";

export default function forgot() {

	return (
		<div className=" h-screen py-20 px-[200px] text-gray-600 sm:px-0">
			{/* Container */}
			<div className=" h-full flex">
				{/* Left Side */}
				<div className="shadow-xl w-1/2 flex items-center justify-center sm:hidden">
					<Image src={forgotImage} alt="loginImg" />
				</div>

				{/* Right Side */}
				<div className="w-1/2 flex flex-col items-center justify-center gap-12 pb-[60px] sm:w-screen">
					<div className="w-full flex flex-col gap-5">
						{/* Extramus Logo */}
						<div className=" w-full flex justify-center">
							<Image
								src={extramusLogo}
								alt="loginImg"
								width="200"
								height="100"
							/>
						</div>

						{/* Title and Sub Title */}
						<div className="w-full flex flex-col items-center gap-1 mb-2 sm:w-screen">
							<p className="text-4xl sm:ml-6">Did you forgot your password ?</p>
							<p className="mt-8 text-xl">
								Please enter here your email :
							</p>
						</div>
						{/* Input */}
						<div className=" flex flex-col items-center sm">
							<input type="email" className="text-black rounded-md w-96 placeholder:italic sm:w-80" placeholder="ex: exemplu@extramus.eu" required />
						</div>
					</div>

					{/* Submit Button */}
					<div className="w-full flex flex-col items-center gap-1">
						<Link href="/dashboard">
							<button className="w-60 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300font-medium rounded-lg text-sm px-3 py-2 text-center mb-4">
								Submit
							</button>
						</Link>

					</div>
				</div>
			</div>
		</div>
	);
}
