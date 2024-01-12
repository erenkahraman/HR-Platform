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
        , [token]);

    return (
        <div>
            {isloading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {data.map((item) => (
                        <div key={item.id}>
                            <div>{item.title}HI</div>
                            <div>{item.category}</div>
                            <div>{item.time}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default Interviews;