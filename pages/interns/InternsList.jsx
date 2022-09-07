import { MoreHoriz, SystemUpdateAlt } from "@mui/icons-material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";

export default function ApplicantsList() {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/intern")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  if (isloading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  const headers = [
    { label: "First name", key: "firstName" },
    { label: "Last name", key: "lastName" },
    { label: "Nationality", key: "nationality" },
    { label: "Departing Country", key: "departingCountry" },
    { label: "Date of birth", key: "dateOfBirth" },
    { label: "Email", key: "email" },
    { label: "Department", key: "applicant.department" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Sex", key: "sex" },
    { label: "University", key: "university" },
    { label: "Application Date", key: "applicant.applicationDate" },
    { label: "Arrival Date", key: "applicant.arrivalDate" },
    { label: "Departure Date", key: "applicant.departureDate" },
    { label: "Hr Interview Date", key: "applicant.hrInterviewDate" },
    { label: "Interview Notes", key: "applicant.interviewNotes" },
    { label: "Position", key: "applicant.position" },
    { label: "Progress", key: "applicant.progress" },
    { label: "Rejection Reasons", key: "applicant.rejectionReasons" },
    { label: "Acceptance Letter", key: "documents.acceptanceLetter" },
    { label: "Accommodation Letter", key: "documents.accommodationLetter" },
    { label: "Arrival Tickets", key: "documents.arrivalTickets" },
    { label: "Confidentiality Letter", key: "documents.confidentialityLetter" },
    { label: "Curiculum Vitae", key: "documents.curiculumVitae" },
    { label: "Identification", key: "documents.identification" },
    {
      label: "Intern Development Plan",
      key: "documents.internDevelopmentPlan",
    },
    { label: "Learning Agreement", key: "documents.learningAgreement" },
  ];

  const csvReport = {
    separator: "  ",
    data: data,
    headers: headers,
    filename: "Extramus Applicant List",
  };
  return (
    <section className="relative w-full">
      <div className="w-full mb-12">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-3 border-0 bg-white">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">Interns List</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="gap-1 hover:bg-gray-200 group flex items-center rounded-md bg-gray-300 text-gray-500 text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                <SystemUpdateAlt className="text-sm" />
                <CSVLink {...csvReport}>Export to CSV</CSVLink>
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="block w-full overflow-x-auto ">
            <table className="items-center w-full border-collapse bg-white">
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Full Name
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Start Date
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    End Date
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Duration In Weeks
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Departement
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Position
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y">
                {data.map((intern) => (
                  <tr key={intern._id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <span className="ml-3 font-bold">
                        {" "}
                        {intern.student.firstName} {intern.student.lastName}{" "}
                      </span>
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {intern.startDate}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {intern.endDate}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {intern.durationInWeeks}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {intern.departement}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {intern.position}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      <a
                        href="#pablo"
                        className="text-blueGray-500 block py-1 px-3"
                        // onclick="openDropdown(event,'table-dark-1-dropdown')"
                      >
                        <MoreHoriz />
                      </a>
                      <div
                        className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                        // id="table-dark-1-dropdown"
                      >
                        <a
                          href="#pablo"
                          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                        >
                          Action
                        </a>
                        <a
                          href="#pablo"
                          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                        >
                          Another action
                        </a>
                        <a
                          href="#pablo"
                          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                        >
                          Something else here
                        </a>
                        <div className="h-0 my-2 border border-solid border-blueGray-100"></div>
                        <a
                          href="#pablo"
                          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                        >
                          Seprated link
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
