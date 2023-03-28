import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const FeedSchedule = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const token = cookie.get("token");
  const [readMore, setReadMore] = useState(null);

  useEffect(() => {
    setLoading(true);
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(`/api/weeklySchedule`, {
          params: { token: token },
          ...config,
        });
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    asyncRequest();
  }, [token]);

  const handleReadMoreClick = (weeklySchedule) => {
    setReadMore(weeklySchedule);
  };

  const handleModalClose = () => {
    setReadMore(null);
  };

  return (
    <>
      <div className="flex m-1 py-2">
        <div className="box-border flex m-1 py-2 w-2/4 border-solid border-2">
          <strong>Morning Shift</strong>
        </div>
        <div className="box-border flex m-1 py-2 w-2/4 border-solid border-2">
          <strong>Afternoon Shift</strong>
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.map((weeklySchedule) => (
          <div className="flex m-2 py-4" key={weeklySchedule.id}>
            <div className="flex flex-[1] flex-col gap-2 p-2">
              <div className="text-sm font-semibold">{weeklySchedule.date}</div>
              <div className="text-xs font-light">
                <div>posted by</div>
                <div>{weeklySchedule.postedBy}</div>
              </div>
            </div>
            <div className="flex flex-[3] flex-col gap-2 p-2">
              <div className="text-sm font-semibold">{weeklySchedule.title}</div>
              <div className="text-xs font-light h-48">
                <p className="h-48" style={{ overflow: "hidden" }}>
                  {weeklySchedule.paragraph}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleReadMoreClick(weeklySchedule)}
              className="flex flex-[1] p-2"
            >
              <div className="flex h-fit text-sm font-semibold underline cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300">
                Read More
              </div>
            </button>
          </div>
        ))
      )}

      {readMore && (
        <div
          className="overlay"
          onClick={() => handleModalClose()}
        >
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">{readMore.title}</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => handleModalClose()}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>{readMore.paragraph}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="modal-close"
                onClick={() => handleModalClose()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
