import React from 'react'

const Modal1 = ({ setModalOn1, setChoice1 }) => {

    const handleOKClick1 = () => {
        setChoice1(true)
        setModalOn1(false)
    }
    const handleCancelClick1 = () => {
        setChoice1(false)
        setModalOn1(false)
    }

  return (
    
    <div className="   bg-zinc-200 opacity-90 fixed inset-0 z-50   ">
  
    <div className="flex h-screen justify-center items-center  ">

        <div className="flex-col justify-center  bg-[#0B3768] py-12 px-24 border-4  rounded-xl ">

            <div className="flex  text-lg  text-white ml-0  mb-8 py-0 px-0" >Are you sure you want to change the status in 
            <p className="text-red-500 text-lg font-bold">"No Answer"? </p>
            </div>
            
           
            
            <div className="flex  flex-row ml-32">
                <button onClick={handleCancelClick1} className=" rounded px-4 py-2 text-white  bg-blue-500 ">Cancel</button>
                <button onClick={handleOKClick1} className="rounded px-4 py-2 ml-4 text-white bg-red-500 ">Change</button>
                
            </div>

        </div>
    </div>
</div>
  );
}

export default Modal1