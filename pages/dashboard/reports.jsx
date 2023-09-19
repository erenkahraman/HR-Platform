import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

function Interviews() {
  const token = cookie.get("token");
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get("/api/upcomingInterviews", {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            token: token,
          },
        });

        const interviews = response.data;

        // Sort the interviews by date in ascending order
        const sortedInterviews = interviews.sort(
          (a, b) => new Date(a.applicant.hrInterviewDate) - new Date(b.applicant.hrInterviewDate)
        );

        // Limit the interviews to 5
        const upcomingInterviews = sortedInterviews.slice(0, 5);
        setUpcomingInterviews(upcomingInterviews);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchInterviews();
    }
  }, [token]);

  return (
    <section className="relative w-full">
      <div className="w-full mb-12">
        {upcomingInterviews.length > 0 ? (
          upcomingInterviews.map((interview) => (
            <div className="flex w-full" key={interview.id}>
              <div className="flex-1 flex flex-col">
                <div className="text-sm font-semibold">
                  {interview.firstName} {interview.lastName}
                </div>
                <div className="text-xs font-light">{interview.applicant.department}</div>
              </div>
              <div className="flex-1 flex items-center justify-center text-xs">{interview.applicant.position}</div>
              <div className="flex-1 flex items-center justify-center text-xs text-gray-500">
                {new Date(interview.applicant.hrInterviewDate).toLocaleDateString()}
              </div>
              <a href="https://meet.google.com/rfd-ovba-acm"> <svg xmlns="https://meet.google.com/rfd-ovba-acm" width="30" height="30" viewBox="0 0 256 211"><path fill="#00832D" d="m144.822 105.322l24.957 28.527l33.562 21.445l5.838-49.792l-5.838-48.669l-34.205 18.839z" /><path fill="#0066DA" d="M0 150.66v42.43c0 9.688 7.864 17.554 17.554 17.554h42.43l8.786-32.059l-8.786-27.925l-29.11-8.786L.001 150.66Z" /><path fill="#E94235" d="M59.984 0L0 59.984l30.876 8.765l29.108-8.765l8.626-27.545z" /><path fill="#2684FC" d="M.001 150.679h59.983V59.983H.001z" /><path fill="#00AC47" d="M241.659 25.398L203.34 56.834v98.46l38.477 31.558c5.76 4.512 14.186.4 14.186-6.922V32.18c0-7.403-8.627-11.495-14.345-6.781" /><path fill="#00AC47" d="M144.822 105.322v45.338H59.984v59.984h125.804c9.69 0 17.553-7.866 17.553-17.554v-37.796l-58.519-49.972Z" /><path fill="#FFBA00" d="M185.788 0H59.984v59.984h84.838v45.338l58.52-48.49V17.555c0-9.69-7.864-17.554-17.554-17.554" /></svg>
              </a>
            </div>
          ))
        ) : (
          <div>No upcoming interviews</div>
        )}
      </div>
    </section>
  );
}

export default Interviews;
