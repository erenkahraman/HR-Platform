const Modal = ({ setModalOn, setChoice }) => {

    const handleOKClick = () => {
        setChoice(true)
        setModalOn(false)
    }
    const handleCancelClick = () => {
        setChoice(false)
        setModalOn(false)
    }


    return (

        <div className="   bg-zinc-200 opacity-90 fixed inset-0 z-50   ">

            <div className="flex h-screen justify-center items-center ">

                <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-[#0b3768] rounded-xl ">

                    <div className="flex flex-column mb-10" >
                        <div className="">
                            <div >
                                <label className="text-m font-semibold" >Name: </label>
                                <input className="rounded border-none bg-[#0B3768] text-white align-middle text-sm my-3 p-2 ml-20" type="text" name="applicant" value="Alena Mango" required />
                            </div>
                            <div>
                            <label className="text-m font-semibold">Departure date: </label>
                                <input className="rounded border-none bg-[#0B3768] text-white align-middle text-sm my-3 p-2 ml-3" type="text" name="arrivalDate" value="09/02/2022" required />
                            </div>
                            <div>
                            <label className="text-m font-semibold">Departure time: </label>
                                <input className="rounded border-none bg-[#0B3768] text-white align-middle text-sm my-3 p-2 ml-3" type="time" name="arrivalTime" value="12:00" required />
                            </div>
                            <div>
                            <label className="text-m font-semibold">Departure city: </label>
                                <input className="rounded border-none bg-[#0B3768] text-white align-middle text-sm my-3 p-2 ml-4" type="text" name="arrivalCity" value="Sibari" required />
                            </div>
                            <div>
                            <label className="text-m font-semibold">Pick up by: </label>
                                <input className="rounded border-none bg-[#0B3768] text-white align-middle text-sm my-3 p-2 ml-11" type="text" name="pickUpBy" value="Francesco Di Marco" required />
                            </div>
                        </div>

                    </div>
                    <div className="flex  justify-end ">
                        <button onClick={handleOKClick} className="mr-2 p-2 rounded text-black font-semibold hover:bg-[#15803d]">Save</button>
                        <button onClick={handleCancelClick} className="p-2 rounded text-black font-semibold hover:bg-[#991b1b]">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Modal

