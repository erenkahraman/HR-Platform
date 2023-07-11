import {
  Button,
  Checkbox,
  FormControlLabel,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Circle, CloseOutlined } from "@mui/icons-material";
import Popup from "reactjs-popup";
import AcceptAplcntModal from "../../components/Modal/AcceptAplcntModal.jsx";
import RejectModal from "../../components/Modal/RejectModal";
import { Box } from "@mui/system";
import { Input } from "postcss";
import Link from "next/link";

//start: Funtion that renders individual applicant rows
export const ApplicantItem = ({ student }) => {

  const [HRchecked, setHRChecked] = useState(student.applicant.hrInterviewStatus);
  const [CEOchecked, setCEOChecked] = useState(student.applicant.ceoInterviewStatus);
  const [departmentManagerChecked, setDepartmentManagerChecked] = useState(student.applicant.departmentInterviewStatus);
  const [acceptAplcntModal, setAcceptAplcntModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [isEditIconActive, setIsEditIconActive] = useState(false);


  // set progress bar
  let setProgressBar = (progress) => {
    switch (progress) {
      case "New Candidate":
        return "20%";
      case "HR Interview":
        return "40%";
      case "CEO Interview":
        return "60%";
      case "Completing Documents":
        return "80%";
      case "Completed":
        return "100%";
      default:
        return "0%";
    }
  };

  const handleSaveDoneStatus = async () => {


    try {
      await fetch(`/api/applicant/${student.applicant._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(
          {
            hrInterviewStatus: HRchecked,
            departmentInterviewStatus: departmentManagerChecked,
            ceoInterviewStatus: CEOchecked
          }
        ),
      });
    } catch (error) {
      console.error(error);
    }

    setIsEditIconActive(false)
  }
  const handleClickEdit = () => {
    setIsEditIconActive(!isEditIconActive);
  };

  return (
    <TableRow key={student._id}>
      <TableCell align="left">
        <span className="font-bold whitespace-nowrap">
          {student.firstName} {student.lastName}{" "}
        </span>
      </TableCell>

      <TableCell>{student.applicant.applicationDate}</TableCell>

      <TableCell>{student.applicant.department}</TableCell>

      <TableCell>{student.applicant.position}</TableCell>

      <TableCell>
        <div className="whitespace-nowrap">{student.applicant.progress}</div>
        <span className="mr-2">
          {setProgressBar(student.applicant.progress)}
        </span>
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
          <div
            style={{
              width: setProgressBar(student.applicant.progress),
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          ></div>
        </div>
      </TableCell>

      <TableCell className="border-t-0 text-xs whitespace-nowrap">
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
          <Typography variant="caption" component="div">
            <input
              className="mx-2 border-2 focus:ring-0"
              type="checkbox"
              value={HRchecked}
              checked={HRchecked}
              onChange={(e) => setHRChecked(e.target.checked)}
            />
            HR Interview
          </Typography>

          <Typography variant="caption" component="div">
            <input
              className="mx-2 border-2  focus:ring-0"
              type="checkbox"
              value={CEOchecked}
              checked={CEOchecked}
              onChange={(e) => setCEOChecked(e.target.checked)}
            />
            CEO Interview
          </Typography>

          <Typography variant="caption" component="div">
            <input
              className="mx-2 border-2  focus:ring-0"
              type="checkbox"
              value={departmentManagerChecked}
              checked={departmentManagerChecked}
              onChange={(e) => setDepartmentManagerChecked(e.target.checked)}
            />
            Department Interview
          </Typography>
        </Box>
      </TableCell>

      <Popup
        contentStyle={{
          background: "transparent",
          borderRadius: "1rem",
        }}
        trigger={
          <TableCell className="align-middle text-xs whitespace-nowrap">
            {!isEditIconActive ? (
              <Button
                startIcon={<EditIcon />}
                size="medium"
                onClick={handleClickEdit}
                type="submit"
              ></Button>
            ) : (
              <div className="flex flex-col mr-2 mt-0">
                <div className="cursor-pointer py-1">
                  <Button
                    size="small"
                    className="text-sm font-medium border-solid border-white text-white bg-[#0B3768] hover:bg-[#0b37682b] hover:text-[#0B3768]"
                    type="submit"
                    // onClick={() => setIsEditIconActive(false)}
                    onClick={handleSaveDoneStatus}
                  >
                    Save
                  </Button>
                </div>
                <div className="cursor-pointer py-1">
                  <Button
                    size="small"
                    className="text-sm font-medium border-solid border-white text-white bg-[#0B3768] hover:bg-[#0b37682b] hover:text-[#0B3768]"
                    type="submit"
                    onClick={(e) => setAcceptAplcntModal(true)}
                  >
                    Accept
                  </Button>

                  {acceptAplcntModal && (
                    <AcceptAplcntModal
                      setAcceptAplcntModal={setAcceptAplcntModal}
                      stdId={student._id}
                    />
                  )}
                </div>
                <div>
                  <Button
                    size="small"
                    className="text-sm font-medium border-solid border-white text-white bg-[#0B3768]  hover:bg-[#0b37682b] hover:text-[#0B3768]"
                    type="submit"
                    onClick={(e) => setRejectModal(true)}
                  >
                    Reject
                  </Button>

                  {rejectModal && (
                    <RejectModal
                      student={student}
                      setRejectModal={setRejectModal}
                    />
                  )}
                </div>
                <div className="cursor-pointer py-1">
                  <Button
                      size="small"
                      className="text-sm font-medium border-solid border-white text-white bg-[#0B3768] hover:bg-[#0b37682b] hover:text-[#0B3768]"
                      type="submit"
                      onClick={handleSaveDoneStatus}
                  >
                    <Link href={""}>Edit</Link>
                  </Button>
                </div>
              </div>
            )}
          </TableCell>
        }
        position="bottom"
      >
        {/* </div> */}
      </Popup>
    </TableRow>
  );
};
//end
