import Image from "next/image";
import React, { useState } from "react";
import loginImage from "../../public/loginImage.png";
import extramusLogo from "../../public/extramusLogo.png";
import Link from "next/link";
import Modal from "../../components/Modal/modal3"

export default function Login() {

	const [modalOn,setModalOn]=useState(false);
	const [choice,setChoice]=useState(false);

	const clicked =() => {
		setModalOn(true)
	}

	return (
		<div className=" h-screen py-20 px-[200px] text-gray-600">
			{/* Container */}
			<div className=" h-full flex">
				{/* Left Side */}
				<div className="shadow-xl w-1/2 flex items-center justify-center">
					<Image src={loginImage} alt="loginImg" />
				</div>

				{/* Right Side */}
				<div className="w-1/2 flex flex-col items-center justify-center gap-12 pb-[60px]">
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
							<a href="#" className="text-[#0070ba] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ...">
								Forgot password?
							</a>
						</div>
					</div>

					{/* Submit Button */}
					<div className="w-full flex flex-col items-center gap-1">
						<Link href="/dashboard">
							<button className=" w-60 bg-[#597EF7] rounded-xl p-3 text-white hover:bg-[#003087] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ...">
								Log In
							</button>
						</Link>

						<p>
							Don&apos;t have an account?{" "}
							<button onClick={clicked} className="text-[#0070ba] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ...">
								Sign Up
							</button>
							{modalOn && < Modal setModalOn={setModalOn} setChoice={setChoice} />}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
