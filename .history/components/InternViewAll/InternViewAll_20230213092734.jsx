import { CheckCircleOutline, WorkOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Tooltip, Button } from "@material-tailwind/react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import cookie from "js-cookie";
import LoadingState from "../Utils/LoadingState";
import EditDocumentsModal from "../Modal/EditDocumentsModal";


    const Border = (title) => {
      let statusColor;
  
      title === "Human Resource Management"
        ? (statusColor = " bg-green-400 ")
        : title === "Project Management"
        ? (statusColor = " bg-red-400 ")
        : title === "Business and Data Analyst"
        ? (statusColor = " bg-blue-400 ")
        : title === "Marketing"
        ?(statusColor = " bg-yellow-400 ")
        : title === "Information Technology"
        ?(statusColor = " bg-cyan-400 ")
        : title === "Language Teaching Department"
        ?(statusColor = " bg-orange-400 ")
        : (statusColor = " bg-gray-400 ");
  
      let result =
        "flex flex-col w-full py-2 px-6 gap-2 bg-white border rounded-md " +
        statusColor;
      return result;
    };
  
   

const InternView = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [department, setDepartment] = useState([]);
  const token = cookie.get("token");

  useEffect(() => {
    setOpen(true);
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/department`,
          { params: { token: token } },
          config
        );
        setDepartment(data);
        setOpen(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
      }
    };
    asyncRequest();
  }, []);

  useEffect(() => {
    setOpen(true);
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/intern`,
          { params: { token: token } },
          config
        );
        setStudents(data);
        setOpen(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
      }
    };
    asyncRequest();
  }, []);

 

  return (
    <div className="flex flex-col w-full gap-2">
      <LoadingState open={open} />
      {department.length == 0 ? (
        <div
          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap 
                  p-4 flex items-center"
        >
          The Intern view is empty at the moment!
        </div>
      ) : (
        department.map((dep, index) => (
          <div  className={Border(dep.department)}>
            {/* Top  */}
            <div className="flex justify-between">
              {/* Top Left */}
              <div className="flex gap-4 items-center">
                <div className="flex font-semibold">
                  <p>
                    {
                      students.filter((std,index) => {
                       return std.applicant.department == dep.department
                      })
                    }
                    {dep.department}
                   
                  </p>
                </div>   
                
              </div>
              
            </div>
            
          </div>
            
        ))

      )}
      <div className="flex flex-col w-full gap-2">
        {students.map((student, index) => (
          
            <div className="flex justify-between">
             
              <div className="flex gap-4 items-center">
              {student.FirstName}
              </div>
        
          </div>
        ))}
      </div>

    </div>
  );
};

export default InternView;
