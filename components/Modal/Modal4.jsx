import React from 'react';
import {MdOutlineCancel} from "react-icons/md";
import {BsPeopleFill} from "react-icons/bs" ;

const Modal4 = ({ setModalOn4, setChoice4 }) => {

    const handleCancelClick4 = () => {
        setChoice4(false)
        setModalOn4(false)
    }

  return (
    
    <div className=" opacity-90  bg-zinc-300 fixed inset-0 z-50   ">
  
    <div className="flex h-screen justify-center items-center  ">

        <div className="flex-col bg-white border-4 m-4 rounded-xl px-10 p-0 ">
             <div className="flex flex-row-reverse  m-auto ml-36 mb-4">
                <button onClick={handleCancelClick4} className=" rounded px-4 py-2  text-black text-2xl"><MdOutlineCancel/></button>
            </div>
            <div className="flex flex-row gap-16 text-5xl  bg-white  mb-8 ml-4 mr-4">
						<div className="flex flex-row ml-5">
						<div className="text-red-400 ">
					    <BsPeopleFill/>
						</div>
						<div className="flex flex-col text-sm font-bold ">
						<div>Human Recources</div>
						<div className="text-xl ml-3 ">6</div>
						</div>
						</div>

						<div className="flex flex-row">
						<div className="text-[#f5d556] ">
					    <BsPeopleFill/>
						</div>
						<div className="flex flex-col text-sm font-bold ">
						<div>ICT</div>
						<div className="text-xl ml-3 ">6</div>
						</div>
						</div>

						<div className="flex flex-row">
						<div className="text-[#88f556] ">
					    <BsPeopleFill/>
						</div>
						<div className="flex flex-col text-sm font-bold ">
						<div>Marketing</div>
						<div className="text-xl ml-3 ">6</div>
						</div>
						</div>

						<div className="flex flex-row">
						<div className="text-[#56eaf5]">
					    <BsPeopleFill/>
						</div>
						<div className="flex flex-col text-sm font-bold ">
						<div>Business & Analysis</div>
						<div className="text-xl ml-3 ">6</div>
						</div>
						</div>

						<div className="flex flex-row">
						<div className="text-[#f556b8]">
					    <BsPeopleFill/>
						</div>
						<div className="flex flex-col text-sm font-bold ">
						<div>Project Management</div>
						<div className="text-xl ml-3 ">6</div>
						</div>
						</div>

						<div className="flex flex-row">
						<div className="text-[#e056f5]">
					    <BsPeopleFill/>
						</div>
						<div className="flex flex-col text-sm font-bold ">
						<div>Language Teaching</div>
						<div className="text-xl ml-3 ">6</div>
						</div>
						</div>


					</div>

        </div>
    </div>
</div>
  );
}

export default Modal4