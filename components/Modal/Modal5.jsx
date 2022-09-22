import React from 'react'

const Modal5 = ({ setModalOn5, setChoice5 }) => {

    const handleOKClick5 = () => {
        setChoice5(true)
        setModalOn5(false)
    }
    const handleCancelClick5 = () => {
        setChoice5(false)
        setModalOn5(false)
    }

  return (
    
    <div className="   bg-zinc-200 opacity-90 fixed inset-0 z-50   ">
  
    <div className="flex h-screen justify-center items-center  ">

        <div className="flex-col justify-center  bg-[#0B3768] py-12 px-24 border-4  rounded-xl ">

            <div className="flex  text-lg  text-white ml-0  mb-8 py-0 px-0" >Are you sure you want to move the intern in 
            <p className="text-red-500 text-lg font-bold">"End Internship"? </p>
            </div>
            
           
            
            <div className="flex  flex-row ml-32">
                <button onClick={handleCancelClick5} className=" rounded px-4 py-2 text-white  bg-blue-500 ">Cancel</button>
                <button onClick={handleOKClick5} className="rounded px-4 py-2 ml-4 text-white bg-red-500 ">Move</button>
                
            </div>

        </div>
    </div>
</div>
  );
}

export default Modal5