const model1 = ({ setModalOn, setChoice }) => {
  const handleOKClick = () => {
    setChoice(true);
    setModalOn(false);
  };
  const handleCancelClick = () => {
    setChoice(false);
    setModalOn(false);
  };
  return (
    <div className="   bg-zinc-200 opacity-90 fixed inset-0 z-50   ">
      <div className="flex h-screen justify-center items-center ">
        <div className="flex-col justify-center bg-[#0B3768] py-12 px-24 pl-16 border-4 rounded-xl ">
          <div className="flex  text-lg  text-white ml-10 mb-4">
            Edit Applicant Arrival{" "}
          </div>
          <div className="flex flex-column mb-10">
            <div className="">
              <div>
                <label className="text-sm text-white ">Name: </label>
                <input
                  className="rounded border-none bg-white text-black align-middle text-sm my-3 p-2 ml-14"
                  type="text"
                  name="applicant"
                  value="Alena Mango"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white ">Arrival date: </label>
                <input
                  className="rounded border-none bg-white text-black align-middle text-sm my-3 p-2 ml-5"
                  type="text"
                  name="arrivalDate"
                  value="09/02/2022"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white">Arrival time: </label>
                <input
                  className="rounded border-none bg-white text-black align-middle text-sm my-3 p-2 ml-5"
                  type="time"
                  name="arrivalTime"
                  value="12:00"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white ">Arrival city: </label>
                <input
                  className="rounded border-none bg-white text-black align-middle text-sm my-3 p-2 ml-7"
                  type="text"
                  name="arrivalCity"
                  value="Sibari"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white ">Pick up by: </label>
                <input
                  className="rounded border-none bg-white text-black align-middle text-sm my-3 p-2 ml-7"
                  type="text"
                  name="pickUpBy"
                  value="Francesco Di Marco"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex  justify-end ">
            <button
              onClick={handleCancelClick}
              className=" rounded px-4 py-2 text-white  bg-blue-400 "
            >
              Cancel
            </button>
            <button
              onClick={handleOKClick}
              className="rounded px-4 py-2 ml-4 text-white bg-green-400 "
            >
              Save{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default model1;
