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
            {data.map((student) => (
                <div key={student.id} className="flex w-full">
                    <div className="flex-[1] flex items-center justify-center">
                        <Circle className={circleColor()} />
                    </div>
                    <div className="flex-[5] flex flex-col">
                        <div className="text-sm font-semibold">
                            {student.firstName} {student.lastName}
                        </div>
                        <div className="text-xs font-light ">
                            {student.intern.position}
                        </div>
                    </div>
                    <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
                        {student.day} / {student.month}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Interviews;