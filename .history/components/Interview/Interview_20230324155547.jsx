import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

const Interviews = () => {
    const token = cookie.get("token");
    const [data, setData] = useState([]);
    const [isloading, setLoading] = useState(true);

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
                    `/api/interview`,
                    { params: { token: token } },
                    config
                );
                setData(data);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };
        asyncRequest();
    }
    , []);

    return (
        <div>
            {data.map((interview) => (
                <div
                    key={interview.id}
                    className="items-center w-full border-collapse bg-white"
                >
                    <div className="flex m-2 py-4">
                        <div className="flex-[5] flex flex-col">
                            <div className="text-sm font-semibold">{applicant.name}</div>
                            <div className="text-xs font-light ">{applicant.department}</div>
                        </div>
                        <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
                            {applicant.hrInterviewDate}
                        </div>
                        <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
                            {applicant.date}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Interviews;