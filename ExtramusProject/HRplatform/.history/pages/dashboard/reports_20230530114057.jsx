
import { Interview } from '../../components/Interview';
import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";

function Interviews() {

  const token = cookie.get("token");
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  useEffect(() => {
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/upcomingInterviews`,
          { params: { token: token } },
          config
        );
        const filteredData = data.filter(intern => new Date(intern.date) >= new Date());
        filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
        setData(filteredData);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    asyncRequest();
  }, []);


  return (
    <section className="relative w-full">
      <div className="w-full mb-12">
        <div>
          <div>
            {upcomingInterviews.map((eachUpcomingInterview) => (
              <div className="flex w-full">
                <div className="flex-[1] flex flex-col">
                  <div className="text-sm font-semibold">{eachUpcomingInterview.firstName + " " + eachUpcomingInterview.lastName} </div>
                  <div className="text-xs font-light ">{eachUpcomingInterview.applicant.department}</div>
                </div>
                <div className="flex-[1] flex items-center justify-center text-xs">{eachUpcomingInterview.applicant.position}</div>
                <div className="flex-[1] flex items-center justify-center text-xs text-gray-500">
                  {new Date(eachUpcomingInterview.applicant.hrInterviewDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Interviews;
