import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { ApplicantItem } from "../Applicants/ApplicantItem";

const UpcomingViewAll = ({ student }) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const token = cookie.get("token");
    useEffect(() => {
        setLoading(true);
        const asyncRequest = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const { data } = await axios.get(
                    `/api/applicant`,
                    { params: { token: token } },
                    config
                );
                const filteredData = data.filter(student => new Date(student.applicant.hrInterviewDate) >= new Date());
                filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                setData(filteredData);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };
        asyncRequest();
    }, []);
    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                data.map((student) => (
                    <div key={student.applicant.id} className="items-center w-full border-collapse bg-white">
                        <div className="flex m-2 py-4">
                            <div className="flex-[5] flex flex-col">
                                <div className="text-xs font-light ">{student.firstName}{" "}{student.lastName}</div>
                            </div>
                            <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
                                {student.applicant.department}
                            </div>
                            <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
                                {student.applicant.hrInterviewDate}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
export default UpcomingViewAll;
