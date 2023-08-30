import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { DocumentReview } from "../DocumentReview";
import { useMemo } from "react";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const EditDocumentsModal = ({
  openDialog,
  setOpenDialog,
  intern,
  index,
  type,
}) => {
  const docs = [
    "Curriculum Vitae",
    "Motivation Letter",
    "Arrival Tickets",
    "Learning Agreement",
    "Acceptance Letter",
    "Interview Record",
  ];
  const [loading, setLoading] = useState();
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return intern;
    }, [intern]),
  });

  useEffect(() => {
    reset(intern);
  }, [intern]);

  const updateDocuments = async (data) => {
    setLoading(true);
    switch (type) {
      case "applicant":
        try {
          await fetch(`/api/applicant/${data.applicant._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ documents: data.applicant.documents }),
          });
          // students[index] = data;
        } catch (error) {
          console.error(error);
        }
        break;
      case "internTest":
        try {
          await fetch(`/api/internTest/${data.internTest._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ documents: data.internTest.documents }),
          });
          // students[index] = data;
        } catch (error) {
          console.error(error);
        }
        break;
    }
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        className="fixed  w-3/4 h-50 ml-64 px-80 p-0 pl-8 mt-32 border-2 border-[#0B3768] rounded-xl shadow-lg shadow-[#0B3768]"
      >
        <DialogHeader>
          Edit Documents for {intern.student.firstName} {intern.student.lastName}
        </DialogHeader>
        <DialogBody className="" divider>
          <div className="flex p-4">
            <div className="flex flex-col w-full gap-4">
              <div className="flex gap-6 justify-start">
                {Object.keys(intern.documents).map((doc) => (
                  <DocumentReview key={doc} register={register} title={doc} type={type} />
                ))}
              </div>
            </div>
          </div>
        </DialogBody>
        <div className="flex flex-row ml-6">
          <DialogFooter>
            <Button
              className="mr-4 ml-auto px-6 text-red-400 bg-white hover:bg-red-400 hover:text-white border-red-400 rounded-xl border-2"
              onClick={(e) => setOpenDialog(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              className="px-9 text-green-400 bg-white hover:bg-green-400 hover:text-white border-green-400 rounded-xl border-2"
              color="success"
              loading={loading}
              onClick={handleSubmit(updateDocuments)}
              loadingIndicator="Loading…"
              variant="outlined"
            >
              Submit
            </LoadingButton>
          </DialogFooter>
        </div>
      </Dialog>
    </div>
  );
};

export default EditDocumentsModal;
