import Image from "next/image";
import React, { useState } from "react";
import extramusLogo from "../../public/extramusLogo.png";

const Modal = ({ setModalOn, setChoice }) => {

    const handleOKClick = () => {
        setChoice(true)
        setModalOn(false)
    }
    const handleCancelClick = () => {
        setChoice(false)
        setModalOn(false)
    }

    // bg-[#0b3768]

    return (

        <div className="fixed inset-0 z-50   ">

            <div className="flex h-screen justify-end mr-64 items-center shadow-2xl">

                <div className="justify-center bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 border-4 border-none rounded-xl px-16 py-10 shadow-2xl">

                    <div className="flex flex-col" >
                        {/* Extramus Logo */}
                        <div className="w-auto flex justify-center ">
                            <Image
                                src={extramusLogo}
                                alt="loginImg"
                                width="200"
                                height="100"
                            />
                        </div>
                        {/* Title and Sub Title */}
                        <div className="w-full flex felx flex-col items-center mb-2">
                            <p className="text-white text-4xl my-2">HR Platform Sign Up</p>
                            <p className="text-white text-m flex flex-col ml-1 mt-3">
                                Get started with your free account </p>
                        </div>

                        {/* Input */}
                        <div className="w-full flex flex-col items-left gap-y-3 mt-4">
                            <label className="text-white">Full name:
                                <input type="text" className="text-black ml-14 rounded-md placeholder:italic" placeholder="ex: Lia Ciobanu" required />
                            </label>
                            <label className="text-white">Email address:
                                <input type="email" className="text-black ml-7 rounded-md placeholder:italic" placeholder="ex: exemplu@extramus.eu" required />
                            </label>
                            <label className="text-white">Phone number:
                                <input type="phone" className="text-black ml-5 rounded-md px-3 placeholder:italic" placeholder="ex: 078965223" required />
                            </label>
                            <label className="text-white" >Select job type:
                                <select className="text-black ml-5 rounded-md">
                                    <option disabled selected>Your job type</option>
                                    <option>Intern</option>
                                    <option>HR</option>
                                    <option className="rounded-b-md">Main Staff</option>
                                </select>
                            </label>
                            <label className="text-white">Your password:
                                <input type="password" className="text-black ml-6 rounded-md placeholder:italic" placeholder="ex: passWord123!" required />
                            </label>
                            <label className="text-white">Repeat password:
                                <input type="password" className="text-black ml-2 rounded-md placeholder:italic" placeholder="ex: passWord123!" required />
                            </label>
                        </div>

                        {/* Button create account and near to him*/}
                        <div className="flex flex-col items-center text-white mt-6 ">
                            <button onClick={handleOKClick} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center mb-4">Create Account</button>
                            <p className="text-sm">Have an account?<button className="font-semibold px-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ..." onClick={handleCancelClick}>Log In</button></p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default Modal

