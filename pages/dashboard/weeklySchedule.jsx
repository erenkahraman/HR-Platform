import FeedSchedule from "../../components/Feed/FeedSchedule"
import AddIcon from '@mui/icons-material/Add';
import Modal from "../../components/LiaModal/model";
import React, { useState } from "react";

function WeeklySchedule() {
  
  const [modalOn,setModalOn]=useState(false);
  const [choice,setChoice]=useState(false);

  const clicked =() => {
    setModalOn(true)
  }

  return (
    <section className="relative w-full">
      <div className="w-full mb-12">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">

          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">Weekly Schedule</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={clicked}>
                <span className="hover:bg-green-400 group flex items-center rounded-md bg-green-500 text-white text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                  <AddIcon />
                  <p className="text-m">Add Schedule</p>
                </span>
              </button>
            </div>

          

            {modalOn && < Modal setModalOn={setModalOn} setChoice={setChoice} />}
          

          </div>

          <div className="block w-full overflow-x-auto">
            <div className="items-center w-full border-collapse bg-white">
              <FeedSchedule />
            </div>
            <div className="items-center w-full border-collapse bg-white">
              <FeedSchedule />
            </div>
          </div>

        </div>
      </div>
    </section >
  );
};

export default WeeklySchedule;


