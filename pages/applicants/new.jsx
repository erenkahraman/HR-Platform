import { DocumentReview } from "../../components/DocumentReview";
import countryList from "react-select-country-list";
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import Popup from "reactjs-popup";
import { Cancel, Verified } from "@mui/icons-material";
import mongoose from "mongoose";

export default function ApplicantsNew() {
  const router = useRouter();
  const [nationalityValue, setNationality] = useState("");
  const [departingCountryValue, setDepartingCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const updateNationality = (nationality) => {
    setNationality(nationality);
  };
  const updateDepartingCountry = (departingCountry) => {
    setDepartingCountry(departingCountry);
  };
  const [submitStatus, setSubmitStatus] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(submitStatus=="Cancel"){
    router.push("/applicants/list");
    }else{

    
    const applicantId = new mongoose.Types.ObjectId();44
    const studentId = new mongoose.Types.ObjectId();
    const student = {
      _id: studentId,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      dateOfBirth: event.target.dateOfBirth.value,
      sex: event.target.sex.value,
      phoneNumber: event.target.phoneNumber.value,
      university: event.target.university.value,
      nationality: nationalityValue.label,
      departingCountry: departingCountryValue.label,
      applicant: applicantId,
    };
    const applicant = {
      _id: applicantId,
      applicationDate: event.target.applicationDate.value,
      arrivalDate: event.target.arrivalDate.value,
      departureDate: event.target.departureDate.value,
      departureTime: event.target.departureTime.value,
      departureCity: event.target.departureCity.value,
      pickUpBy: event.target.pickUpBy.value,
      progress: event.target.progress.value,
      department: event.target.department.value,
      position: event.target.position.value,
      hrInterviewDate: event.target.hrInterviewDate.value,
      interviewNotes: event.target.interviewNotes.value,
      rejectionReasons: event.target.rejectionReasons.value,
      student: studentId,
      documents: {
        curiculumVitae: event.target.resume.value,
        learningAgreement: event.target.lrnargmt.value,
        acceptanceLetter: event.target.acptltr.value,
        accommodationLetter: event.target.acmdtltr.value,
        arrivalTickets: event.target.arvltckt.value,
        internDevelopmentPlan: event.target.idp.value,
        confidentialityLetter: event.target.confltr.value,
        identification: event.target.ident.value,
      },
    };
    const JSONdstudent = JSON.stringify(student);
    const JSONapplicant = JSON.stringify(applicant);
    console.log(JSONdstudent);
    console.log(JSONapplicant);
    const endpointstudent = "/api/student";
    const endpointapplicant = "/api/applicant";
    const optionsStudent = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSONdstudent,
    };
    const optionApplicant = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSONapplicant,
    };
    await fetch(endpointstudent, optionsStudent);
    await fetch(endpointapplicant, optionApplicant);
    router.push("/applicants/list");
}};

  return (
    <section className="relative w-full">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded">
          {/* Title Container */}
          <div className="flex justify-between rounded-t px-4 py-3 border-b-2 border-gray-300">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">Create Applicant</h3>
              </div>
            </div>
          </div>

          {/* Forms Container */}
          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Top  */}
              <div className="flex gap-6">
                {/* Section */}
                {/* Personal Details */}
                <div className="flex flex-[1] flex-col gap-4 px-4 py-5">
                  <div className="mb-2 font-semibold">Personal Details</div>
                  {/* Photo */}
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm">Photo</label>
                    <div className="flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        onClick={() => alert("Upload Photo")}
                        className="ml-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* First Name and Last Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="first-name" className="block text-sm">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="firstName"
                      required
                      autoComplete="given-name"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="last-name" className="block text-sm">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="lastName"
                      required
                      autoComplete="family-name"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Sex */}
                  <fieldset className="flex flex-col gap-2">
                    <legend className="block text-sm">Sex</legend>
                    <div className="flex mt-1 gap-4">
                      <div className="flex items-center">
                        <input
                          id="sex"
                          name="gender"
                          type="radio"
                          value="Male"
                          defaultChecked
                          className="focus:ring-blue-500 text-blue-600 border-gray-300"
                        />
                        <label
                          htmlFor="push-everything"
                          className="ml-2 block text-sm"
                        >
                          Male
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="sex"
                          name="gender"
                          type="radio"
                          value="Female"
                          className="focus:ring-blue-500 text-blue-600 border-gray-300"
                        />
                        <label
                          htmlFor="push-email"
                          className="ml-2 block text-sm"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  {/* Date of Birth */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email-address" className="block text-sm">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="date-of-birth"
                      required
                      id="dateOfBirth"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Nationality */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Nationality" className="block text-sm">
                      Nationality
                    </label>
                    <Select
                      instanceId="Nationality"
                      options={options}
                      value={nationalityValue}
                      onChange={updateNationality}
                    />
                  </div>
                </div>
                {/* Section */}
                {/* Contact Details */}
                <div className="flex flex-[1] flex-col gap-4 px-4 py-5">
                  <div className="mb-2 font-semibold">Contact Details</div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="block text-sm">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="block text-sm">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phoneNumber"
                      autoComplete="phone"
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* University */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="university" className="block text-sm">
                      University
                    </label>
                    <input
                      type="text"
                      name="university"
                      id="university"
                      autoComplete="university"
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Departing Country */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="departingCountry" className="block text-sm">
                      Departing Country
                    </label>
                    <Select
                      instanceId="departingCountry"
                      options={options}
                      value={departingCountryValue}
                      onChange={updateDepartingCountry}
                    />
                  </div>
                </div>

                {/* Section */}
                {/* Internship Details */}
                <div className="flex flex-[1] flex-col gap-4 px-4 py-5">
                  <div className="mb-2 font-semibold">Application Details</div>

                  <div className="flex gap-4">
                    {/* Applied on */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="applied-on" className="block text-sm">
                        Applied on
                      </label>
                      <input
                        type="date"
                        name="applied-on"
                        id="applicationDate"
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Interview Date */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="applied-on" className="block text-sm">
                        HR Interview Date
                      </label>
                      <input
                        type="date"
                        name="interview-date"
                        id="hrInterviewDate"
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {/* CEO Interview Date */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="ceo-interview" className="block text-sm">
                        CEO Interview Date
                      </label>
                      <input
                        type="date"
                        name="ceo-interview"
                        id="ceoInterview"
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Department */}
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="department" className="block text-sm">
                        Department
                      </label>
                      <select
                        id="department"
                        name="department"
                        autoComplete="department"
                        className="block w-48 py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Human Resources</option>
                        <option>ICT</option>
                        <option>Business Analyst</option>
                      </select>
                    </div>
                    {/* Button new department */}

                    <Popup
                      contentStyle={{
                        background: "#0B3768",
                        borderRadius: "1rem",
                      }}
                      trigger={
                        <div className="flex flex-col gap-2">
                          <button
                            type="submit"
                            className="w-48 mt-7 inline-flex justify-center py-2 px-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Add New Department
                          </button>
                        </div>
                      }
                      position="bottom"
                    >
                      <div className="m-1 p-2 w-64 px-0">
                        <div>
                          <h6 className="font-semibold text-xl text-white pt-2 pb-4 pl-3">
                            Add New Department
                          </h6>
                          <div className="flex flex-row mx-2 mt-2 mb-4">
                            <input
                              type="text"
                              className="rounded border-none bg-[#fafbfc] text-black h-10 w-52 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
                              placeholder="Introduce new department"
                              required
                            />
                          </div>
                        </div>

                        {/* BUTTOM PART */}
                        <div className="flex p-4 gap-4">
                          <button
                            type="submit"
                            onClick={() => setSubmitStatus("Cancel")}
                            className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-500 bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            onClick={() => setSubmitStatus("Save")}
                            className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-blue-500 bg-white hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </div>

                  {/* Position */}
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="department" className="block text-sm">
                        Position
                      </label>
                      <select
                        id="position"
                        name="position"
                        autoComplete="Position"
                        className="block w-48 py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Backend Developer</option>
                        <option>DevOps</option>
                        <option>data Analyst</option>
                      </select>
                    </div>
                    <Popup
                      contentStyle={{
                        background: "#0B3768",
                        borderRadius: "1rem",
                      }}
                      trigger={
                        <div className="flex flex-col gap-2">
                          <button
                            type="submit"
                            className="w-48 mt-7 inline-flex justify-center py-2 px-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Add New Position
                          </button>
                        </div>
                      }
                      position="bottom"
                    >
                      <div className="m-1 p-2 w-64 px-0">
                        <div>
                          <h6 className="font-semibold text-xl text-white pt-2 pb-4 pl-3 ml-5">
                            Add New Position
                          </h6>
                          <div className="flex flex-col mx-2 mt-2 mb-2">
                            {/* <input type="" class="rounded border-none bg-[#fafbfc] text-black h-10 w-52 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm" placeholder="Introduce new position" required /> */}
                            <label
                              htmlFor="checkDepartment"
                              className=" text-sm font-bold text-white pb-1 ml-2 "
                            >
                              Select Department
                            </label>
                            <select
                              id="department"
                              name="department"
                              autoComplete="department"
                              className="flex flex-col w-52 ml-2 py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                              <option>Human Resources</option>
                              <option>ICT</option>
                              <option>Business Analyst</option>
                            </select>
                          </div>
                          <div className="flex flex-row mx-2 mt-2 mb-4">
                            <input
                              type="text"
                              className="rounded border-none bg-[#fafbfc] text-black h-10 w-52 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
                              placeholder="Introduce new position"
                              required
                            />
                          </div>
                        </div>

                        {/* BUTTOM PART */}
                        <div className="flex p-4 gap-4">
                          <button
                            type="submit"
                            value="Cancel"
                            onClick={() => setSubmitStatus("Cancel")}
                            className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-blue-500 bg-white hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            value="Save"
                            onClick={() => setSubmitStatus("Save")}
                            className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-blue-500 bg-white hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </div>

                  <div className="flex gap-4">
                    {/* Arrival Date */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="arrival-date" className="block text-sm">
                        Arrival Date
                      </label>
                      <input
                        type="date"
                        name="arrival-date"
                        id="arrivalDate"
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Departure Date */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="departure-date" className="block text-sm">
                        Departure Date
                      </label>
                      <input
                        type="date"
                        name="departure-date"
                        id="departureDate"
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {/* Departure city */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="arrival-date" className="block text-sm">
                        Departure City
                      </label>
                      <select
                        id="departureCity"
                        name="departureCity"
                        autoComplete="departureCity"
                        className="flex flex-col w-52 ml-2 py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Terranova da Sibari</option>
                        <option>Bivo Cantinella</option>
                        <option>Sibari</option>
                        <option>Spezzano Albanese Terme</option>
                      </select>
                    </div>

                    {/* Who Pıcked By */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="departure-date" className="block text-sm">
                        Picked By
                      </label>
                      <input
                        type="text"
                        name="pickUpBy"
                        id="pickUpBy"
                        autoComplete="given-name"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  {/* Application Progress */}
                  <div className="flex gap-4">
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="departure-date" className="block text-sm">
                        Departure Time
                      </label>
                      <input
                        type="time"
                        name="departureTime"
                        id="departureTime"
                        autoComplete="given-name"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="Progress" className="block text-sm">
                        Progress
                      </label>
                      <select
                        id="progress"
                        name="Progress"
                        className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>New Candidate</option>
                        <option>HR Interview</option>
                        <option>CEO Interview</option>
                        <option>Completing Documents</option>
                        <option>Completed</option>
                      </select>
                    </div>

                    {
                      //No need for this as it's gonna be changed automatically
                      /* Application Status 
										<div className="flex flex-[1] flex-col gap-2">
											<label htmlFor="status" className="block text-sm">
												Status
											</label>
											<select
												name="status"
												id="status"
												className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
											>
												<option>Accepted</option>
												<option>On Progress</option>
												<option>No Answer</option>
												<option>On Board</option>
												<option>Rejected</option>

											</select>
										</div>*/
                    }
                  </div>
                </div>
              </div>

              {/* Bottom  */}
              <div className="flex gap-12 p-4">
                <div className="flex-[1] flex flex-col">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Interview Notes
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="interviewNotes"
                      name="interview-notes"
                      rows={2}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Notes for or during the interview.
                  </p>
                </div>
                <div className="flex-[1] flex flex-col">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rejection Reasons
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="rejectionReasons"
                      name="rejectio-reasons"
                      rows={2}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description of why the candidate is rejected.
                  </p>
                </div>
              </div>

              <div className="flex p-4">
                <div className="flex flex-col w-1/3 gap-2">
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-semibold"
                  >
                    Google Drive Integration
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      http://
                    </span>
                    <input
                      type="text"
                      name="company-website"
                      id="company-website"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="drive.google.com/"
                    />
                  </div>
                </div>
              </div>

              <div className="flex p-4">
                <div className="flex flex-col w-full gap-4">
                  <div className="block text-sm font-semibold">
                    Application Documents
                  </div>
                  <div className="flex gap-6 justify-start">
                    <DocumentReview title="Curriculum Vitae" id="resume" />
                    <DocumentReview title="Learning Agreement" id="lrnargmt" />
                    <DocumentReview title="Acceptance Letter" id="acptltr" />
                    <DocumentReview
                      title="Accommodation Letter"
                      id="acmdtltr"
                    />
                  </div>
                  <div className="flex gap-6 justify-start">
                    <DocumentReview title="Arrival Tickets" id="arvltckt" />
                    <DocumentReview title="Intern Development Plan" id="idp" />
                    <DocumentReview
                      title="Confidentiality Letter"
                      id="confltr"
                    />
                    <DocumentReview title="Identification" id="ident" />
                  </div>
                  <div className="flex gap-6 justify-start">
                    <DocumentReview title="Grant" />
                    <div className="flex w-48 flex-col gap-2">
                      <label htmlFor="cv" className="block text-sm">
                        Extramus email
                      </label>
                      <select
                        name="cv"
                        id="cv"
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Do it</option>
                        <option>It&apos;s done </option>
                      </select>
                    </div>
                    <div className="flex w-48 flex-col gap-2">
                      <label htmlFor="cv" className="block text-sm">
                        Extramus Folder
                      </label>
                      <select
                        name="cv"
                        id="cv"
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Do it</option>
                        <option>It&apos;s done</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex p-4 gap-4">
                <button
                  type="submit"
                  value="Cancel"
                  onClick={() => setSubmitStatus("Cancel")}
                  className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-500 bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  value="Save"
                  onClick={() => setSubmitStatus("Save")}
                  className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
