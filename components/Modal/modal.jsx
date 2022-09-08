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

                    <div className="flex  text-lg  text-zinc-600 mb-10" >
                        <p>The new scheduele for this week</p>
                        
                    </div>
                    <div className="flex">
                        <button onClick={handleOKClick} className="rounded px-4 py-2 text-white bg-[#0b3768] hover:bg-[#15803d]">Save</button>
                        <button onClick={handleCancelClick} className="rounded px-4 py-2 ml-4 text-white bg-[#0b3768] hover:bg-[#991b1b]">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Modal

