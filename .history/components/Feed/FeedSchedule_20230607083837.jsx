import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

const FeedSchedule = () => {
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [morningDepartments, setMorningDepartments] = useState([]);
  const [afternoonDepartments, setAfternoonDepartments] = useState([]);

  const token = cookie.get("token");

  useEffect(() => {
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/weeklySchedule`,
          { params: { token: token } },
          config
        );

        const weeklyScheduleGroupedByDepartment = data.reduce(
          (departments, item) => {
            const department = departments[item.department] || [];
            department.push(item);
            departments[item.department] = department;
            return departments;
          },
          {}
        );
        setWeeklySchedule(weeklyScheduleGroupedByDepartment);

        const departmentNames = Object.keys(weeklyScheduleGroupedByDepartment);
        setDepartmentNames(departmentNames);

        const clonedDepartmentNamesForMorning = departmentNames.slice(0);
        const clonedDepartmentNamesForAfternoon = departmentNames.slice(0);

        setMorningDepartments(
          clonedDepartmentNamesForMorning.splice(
            0,
            Math.ceil(departmentNames.length / 2)
          )
        );
        setAfternoonDepartments(clonedDepartmentNamesForAfternoon);
      } catch (e) {
        console.error(e);
      }
    };
    asyncRequest();
  }, []);

  const read = () => {
    confirmAlert({
      title: <strong>Schedule</strong>,
      message: (
        <div className="h-96 overflow-y-scroll">
          <div>
            <h3>Morning shift from 8:00 to 13:00:</h3>
            {morningDepartments.map((eachDepartmentName) => (
              <div key={eachDepartmentName}>
                <br />
                <br />
                <p>{eachDepartmentName + ": " + weeklySchedule[eachDepartmentName].length} people</p>
                {weeklySchedule[eachDepartmentName].slice(0, 3).map((eachIntern) => (
                  <p key={eachIntern.student.firstName + eachIntern.student.lastName}>
                    {"• " + eachIntern.student.firstName + " " + eachIntern.student.lastName}
                  </p>
                ))}
              </div>
            ))}
            {morningDepartments.length > 3 && <p>... and more</p>}
          </div>
          <div>
            <h3>Afternoon shift from 13:00 to 18:00:</h3>
            {afternoonDepartments.map((eachDepartmentName) => (
              <div key={eachDepartmentName}>
                <br />
                <br />
                <p>{eachDepartmentName + ": " + weeklySchedule[eachDepartmentName].length} people</p>
                {weeklySchedule[eachDepartmentName].slice(0, 3).map((eachIntern) => (
                  <p key={eachIntern.student.firstName + eachIntern.student.lastName}>
                    {"• " + eachIntern.student.firstName + " " + eachIntern.student.lastName}
                  </p>
                ))}
              </div>
            ))}
            {afternoonDepartments.length > 3 && <p>... and more</p>}
          </div>
        </div>
      ),
      buttons: [
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <div className="flex m-2 py-4">
      <div className="flex flex-[1] flex-col gap-2 p-2">
        <div className="text-sm font-semibold">10 August 2022</div>
        <div className="text-xs font-light">
          <div>posted by</div>
          <div>Antonio Gallo</div>
        </div>
      </div>
      <div className="flex flex-[3] flex-col gap-2 p-2">
        <div className="text-sm font-semibold text-center">Schedule for this week</div>
        <div className="text-xs font-light h-72">
          <div className="flex justify-center gap-8 my-1">
            <div>
              <h3>Morning Shift:</h3>
              {morningDepartments.map((eachDepartmentName) => (
                <div key={eachDepartmentName}>
                  <br />
                  <br />
                  <p>{eachDepartmentName + ": " + weeklySchedule[eachDepartmentName].length} people</p>
                  {weeklySchedule[eachDepartmentName].slice(0, 3).map((eachIntern) => (
                    <p key={eachIntern.student.firstName + eachIntern.student.lastName}>
                      {"• " + eachIntern.student.firstName + " " + eachIntern.student.lastName}
                    </p>
                  ))}
                  {weeklySchedule[eachDepartmentName].length > 3 && (
                    <p>... and more</p>
                  )}
                </div>
              ))}
            </div>
            <div>
              <h3>Afternoon Shift:</h3>
              {afternoonDepartments.map((eachDepartmentName) => (
                <div key={eachDepartmentName}>
                  <br />
                  <br />
                  <p>{eachDepartmentName + ": " + weeklySchedule[eachDepartmentName].length} people</p>
                  {weeklySchedule[eachDepartmentName].slice(0, 3).map((eachIntern) => (
                    <p key={eachIntern.student.firstName + eachIntern.student.lastName}>
                      {"• " + eachIntern.student.firstName + " " + eachIntern.student.lastName}
                    </p>
                  ))}
                  {weeklySchedule[eachDepartmentName].length > 3 && (
                    <p>... and more</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={read} className="flex flex-[1] p-2">
        <div className="flex h-fit text-sm font-semibold underline cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ...">
          Read More
        </div>
      </button>
    </div>
  );
};

export default FeedSchedule;
