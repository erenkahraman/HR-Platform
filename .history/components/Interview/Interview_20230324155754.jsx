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
            {data.map((intern) => (
                <div className="flex w-full">
                    <div className="flex-[1] flex flex-col">
                        <div className="text-sm font-semibold">{intern.name}</div>
                        <div className="text-xs font-light ">{intern.department}</div>
                    </div>
                    <div className="flex-[1] flex items-center justify-center text-xs text-gray-500">
                        {intern.date}
                    </div>
                </div>
            ))}
        </div>
    );
};
