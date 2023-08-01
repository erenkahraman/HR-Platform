import { Circle } from "@mui/icons-material";
// import { EndOfTheInternshipDocumentList } from "../../components/EndOfTheInternshipDocumentList";
// import { DocumentList  } from "postcss";

import {
  CheckCircleOutline,
  ErrorOutline,
  Visibility,
  AccessTime,
} from "@mui/icons-material";
// import { DocumentList } from "../../components/DocumentList";
export default function Documents() {
  return (
    <div className="flex flex-col w-full gap-2">
      {/* Title Container */}
      <div className="flex flex-col gap-4 justify-between rounded-t px-4 mb-4 pb-6 border-b-2 border-gray-400">
        <div className="font-semibold text-2xl">
          <h3>End Internship Documents</h3>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <CheckCircleOutline className="text-sm text-green-500" />
              The documents have been received electronically and are correct
            </div>
            <div className="flex gap-2 items-center">
              <ErrorOutline className="text-sm text-red-500" />
              The documents has been reviewed but it is incorrect
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Visibility className="text-sm text-blue-500" />
              The documents need to be reviewed
            </div>
            <div className="flex gap-2 items-center">
              <AccessTime className="text-sm text-gray-400" />
              The documents has not submitted yet
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse bg-white mt-0 mb-4 ml-auto ">
          {/* search */}
          <form className="flex items-center h-9">
            <div className="relative w-full h-full">
              <div className="flex absolute h-full inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white-500 dark:text-white-400"
                  fill="white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="h-full w-52 rounded-r-lg  border-none bg-[#0B3768] px-10 text-white  placeholder:italic placeholder:text-white placeholder:text-sm"
                placeholder="Search..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-8 px-2 rounded border-none h-full bg-blue-100  ml-1 mr-2 hover:bg-[#0B3768]/75 "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
          <div className="">
            <select
              name="filter"
              className="rounded-l-lg h-9 border-r-transparent w-30 border-[#0B3768] border-r-white bg-[#0B3768] text-white text-sm "
              required
            >
              <option value="" disabled selected>
                Categories{" "}
              </option>
              <option value="Date">Name</option>
              <option value="Date">Date</option>
              <option value="Department">Department</option>
              <option value="Position">Position</option>
              <option value="Status">Status</option>
            </select>
          </div>
        </div>
      </div>
      
    </div>
  );
}
