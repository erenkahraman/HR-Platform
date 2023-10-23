import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// import countInternsInDepartments from 'pages/weeklySchedule/index.jsx';
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

const FeedSchedule = () => {
  const WEEKDAYS = 5;
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [morningDepartments, setMorningDepartments] = useState([]);
  const [afternoonDepartments, setAfternoonDepartments] = useState([]);

  const [dateRange, setDateRange] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [weeklyScheduleByDepartment, setWeeklyScheduleByDepartment] = useState({});
  const [populatedWeeklySchedule, setPopulatedWeeklySchedule] = useState([]);
  const [sumOfMorningShift, setSumOfMorningShift] = useState([]);
  const [sumOfAftenoonShift, setSumOfAftenoonShift] = useState([]);
  const token = cookie.get("token");
  // console.log("received cookies from FeedSchedule");

  useEffect(() => {
    const asyncRequest = async () => {
      try {

        handleCurrentWeekDateRange();
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
        const { weeklySchedule, populatedWeeklySchedule } = data;

        // Update state with the new data
        setWeeklySchedule(weeklySchedule);
        setPopulatedWeeklySchedule(populatedWeeklySchedule);
        console.log(populatedWeeklySchedule);
        
        //Simple function to get the number of people in morning and aftenoon shifts from all departments
        const sumShiftGroups = () =>{
          var tempMorning = 0;
          var tempAftenoon = 0;
          populatedWeeklySchedule.map((group) =>{
            tempMorning += group.Schedule.morning.length;
            tempAftenoon += group.Schedule.afternoon.length;
          });
          setSumOfMorningShift(tempMorning);
          setSumOfAftenoonShift(tempAftenoon);
          tempAftenoon, tempMorning = null;
        }
        sumShiftGroups();

        // const weeklyScheduleGroupedByDepartment = data.reduce(
        //   (departments, item) => {
        //     const department = departments[item.department] || [];
        //     department.push(item);
        //     departments[item.department] = department;
        //     return departments;
        //   },
        //   {}
        // );
        // setWeeklySchedule(weeklyScheduleGroupedByDepartment);

        //setPopulatedWeeklySchedule(populatedWeeklySchedule);
        // const departmentNames = Object.keys(weeklyScheduleGroupedByDepartment);
        // setDepartmentNames(departmentNames);

        // const halfLength = Math.ceil(departmentNames.length / 2);
        // setMorningDepartments(departmentNames.slice(0, halfLength));
        // setAfternoonDepartments(departmentNames.slice(halfLength));
      } catch (e) {
        console.error(e);
      }
    };
    asyncRequest();
  }, [token]);
  useEffect(() => {
    handleCurrentWeekDateRange();
    const fetchInterns = async () => {
      try {

        const token = cookie.get("token");
        if (!token) {
          console.log("Token Expired! error function: fetchInterns");
          return;
        }
        else {
          console.log("Token value from fetchInterns", token);
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            token: token,
          },
        };
      }
      catch (e) {
        console.error(e);
      }
    }
  })
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorEl && !event.target.closest(`#department-menu-${selectedDepartment}`)) {
        setAnchorEl(null);
        setSelectedDepartment(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDay = dd + '/' + mm + '/' + yyyy;

    return formattedDay
  }

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const substractDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  const handleCurrentWeekDateRange = () => {
    const currentDate = new Date();
    const todayNameIndex = currentDate.getDay();
    const firstDayOfTheWeek = substractDays(currentDate, todayNameIndex - 1);
    const formattedFirstDayOfTheWeek = formatDate(firstDayOfTheWeek);
    const lastDayOfTheWeek = addDays(currentDate, WEEKDAYS - todayNameIndex);
    const formattedLastDayOfTheWeek = formatDate(lastDayOfTheWeek);
    const weekDateRange = `${formattedFirstDayOfTheWeek} - ${formattedLastDayOfTheWeek}`;
    setDateRange(weekDateRange);
  }

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
                {eachDepartmentName + ": " + weeklySchedule[eachDepartmentName].length}
              </div>
            ))}
          </div>
          <div>
            <h3>Afternoon shift from 13:00 to 18:00:</h3>
            {afternoonDepartments.map((eachDepartmentName) => (
              <div key={eachDepartmentName}>
                <br />
                <br />
                {eachDepartmentName + ": " + weeklySchedule[eachDepartmentName].length}
              </div>
            ))}
          </div>
        </div>
      ),
      buttons: [
        {
          label: 'OK',
        },
        {
          label: 'Cancel',
        }
      ]
    });
  };
  return (
    <div className="flex flex-wrap m-2 py-4">
      <div className="flex flex-[1] flex-col gap-2 p-2">
        <div className="text-sm font-semibold">  {dateRange}</div>
        <div className="text-xs font-light">
        </div>
      </div>
      <div className="flex flex-[3]  flex-col  ">
        <div className="text-sm text-center font-semibold">Schedule for this week</div>
        <div className="text-xs font-light h-74">
          <div className="flex flex-wrap justify-center gap-8 my-1">
            <div>
              <h3>Morning Shift[{sumOfMorningShift}]:</h3>
              <div>
                {populatedWeeklySchedule.map((schedule) => (
                  <table
                    key={schedule._id}>
                    <thead>
                      <tr>
                        <h3><strong>{schedule.Group} <span>[{schedule.Schedule.morning.length}]</span> </strong></h3>
                      </tr>
                    </thead>
                  </table>

                ))}
              </div>
            </div>
            <div>
              <h3>Afternoon Shift[{sumOfAftenoonShift}]:</h3>
              {populatedWeeklySchedule.map((schedule) => (
                <table
                  key={schedule._id}
                >

                  <h3><strong>{schedule.Group}<span>[{schedule.Schedule.afternoon.length}]</span> </strong></h3>
                </table>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={read} className="flex flex-[1] p-2">
        <div className="flex h-fit text-sm font-semibold underline cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ...">

        </div>
      </button>
    </div>
  );
};

export default FeedSchedule;