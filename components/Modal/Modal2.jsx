import React from 'react'

const Modal2 = ({ setModalOn2, setChoice2 }) => {

    const handleOKClick2 = () => {
        setChoice2(true)
        setModalOn2(false)
    }
    const handleCancelClick2 = () => {
        setChoice2(false)
        setModalOn2(false)
    }

  return (
    
    <div className="   bg-zinc-200 opacity-90 fixed inset-0 z-50   ">
  
    <div className="flex h-screen justify-center items-center  ">

        <div className="flex-col justify-center  bg-[#0B3768] py-12 px-20 border-4  rounded-xl ">

            <div className="flex  text-lg  text-white ml-0  mb-8 py-0 px-0" >Are you sure you want to 
            <p className="text-red-500 text-lg font-bold ml-1">"Reject" </p>  <p className="ml-1">the applicant?</p>
            
            </div>
            
           
            
            <div className="flex  flex-row ml-24">
                <button onClick={handleCancelClick2} className=" rounded px-4 py-2 text-white  bg-blue-500 ">Cancel</button>
                <button onClick={handleOKClick2} className="rounded px-4 py-2 ml-4 text-white bg-red-500 ">Reject</button>
                
            </div>

        </div>
    </div>
</div>
  );
}

export default Modal2