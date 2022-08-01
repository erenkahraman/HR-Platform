import Image from "next/image";
import React from "react";
import loginImage from "../../public/loginImage.png";
import extramusLogo from "../../public/extramusLogo.png";
import Link from "next/link";

export default function Login() {
	return (
		<div className=" h-screen py-20 px-[200px] text-gray-600">
			{/* Container */}
			<div className=" h-full flex">
				{/* Left Side */}
				<div className="w-1/2 flex items-center justify-center">
					<Image src={loginImage} alt="loginImg" />
				</div>

				{/* Right Side */}
				<div className="w-1/2 flex flex-col items-center justify-center gap-12 pb-[60px]">
					<div className="w-full flex flex-col gap-5">
						{/* Extramus Logo */}
						<div className="w-full flex justify-center">
							<Image
								src={extramusLogo}
								alt="loginImg"
								width="200"
								height="100"
							/>
						</div>
						{/* Title and Sub Title */}
						<div className="w-full flex flex-col items-center gap-1 mb-2">
							<p className="text-4xl">HR Platform Log In</p>
							<p>
								Log in with the data that you entered during your registration
							</p>
						</div>
					</div>

					{/* Input */}
					<div className="w-full flex flex-col items-center gap-4">
						<input
							className="p-3 border-[1px] bg-[#E4EBF7] rounded-md w-80"
							placeholder="Email"
						/>
						<div className="flex flex-col gap-2">
							<input
								type="password"
								className="p-3 border-[1px] bg-[#E4EBF7] rounded-md w-80"
								placeholder="Password"
							/>
							<a href="#" className="text-[#0070ba]">
								Forgot password?
							</a>
						</div>
					</div>

					{/* Submit Button */}
					<div className="w-full flex flex-col items-center gap-1">
						<Link href="/dashboard">
							<button className=" w-60 bg-[#597EF7] rounded-xl p-3 text-white transition duration-200 hover:bg-[#003087]">
								Log In
							</button>
						</Link>

						<p>
							Don&apos;t have an account?{" "}
							<a href="#" className="text-[#0070ba]">
								Sign Up
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
