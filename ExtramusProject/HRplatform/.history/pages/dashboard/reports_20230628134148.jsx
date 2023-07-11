import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

function Interviews() {
  const token = cookie.get("token");
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            token: token,
          },
        };

        const response = await axios.get("/api/upcomingInterviews", config);
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
        <div>
          {upcomingInterviews.map((interview) => (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Interviews;
