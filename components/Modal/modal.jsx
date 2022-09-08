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

        <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">

            <div className="flex h-screen  justify-center items-center ">

                <div className="flex-col justify-center bg-[#0b3768] py-5 px-5 border-4 border-none rounded-xl ">

                    <div className="flex mb-5" >
                        <p className="font-semibold text-xl text-white">The new scheduele for this week</p>
                     </div>
                     <div>
                     <textarea className="rounded border-none text-black h-96 w-96 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm" style={{resize:"none"}} placeholder="Type the information..." required />
                     </div>
                    <div className="flex justify-end ">
                        <button onClick={handleOKClick} className="rounded mt-4 p-2 text-white hover:bg-[#15803d]">Save</button>
                        <button onClick={handleCancelClick} className="rounded mt-4 p-2 ml-4 text-white hover:bg-[#991b1b]">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

    );
}
export default Modal

