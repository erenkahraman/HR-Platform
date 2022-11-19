import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
import LoadingState from "../Utils/LoadingState";
import { DocumentReview } from "../DocumentReview";
import { useMemo } from "react";
import { useState } from "react";

const EditDocumentsModal = ({
  openDialog,
  setOpenDialog,
  student,
  index,
  students,
}) => {
  const docs = [
    "Curriculum Vitae",
    "Motivation Letter",
    "Arrival Tickets",
    "Learning Agreement",
    "Acceptance Letter",
  ];
  const [open, setOpen] = useState();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return student;
    }, [student]),
  });

  useEffect(() => {
    reset(student);
  }, [student]);

  const updateDocuments = async (data) => {
    setOpen(true);
    try {
      await fetch(`/api/applicant/${data.applicant._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ documents: data.applicant.documents }),
      });
      students[index] = data;
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
    setOpenDialog(false);
  };
  return (
    <div>
      <LoadingState open={open} />
      <Dialog
        open={openDialog}
        className="fixed  w-3/4 h-50 ml-64 px-80 p-0 pl-8 mt-32 border-2 border-[#0B3768] rounded-xl shadow-lg shadow-[#0B3768]"
      >
        <DialogHeader>
          Edit Documents for {student.firstName} {student.lastName}
        </DialogHeader>
        <DialogBody className="" divider>
          <div className="flex p-4">
            <div className="flex flex-col w-full gap-4">
              <div className="flex gap-6 justify-start">
                {docs.map((doc) => (
                  <DocumentReview register={register} title={doc} />
                ))}
              </div>
            </div>
          </div>
        </DialogBody>
        <div className="flex flex-row ml-6">
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              className="mr-4 ml-auto px-6 text-red-400 bg-white hover:bg-red-400 hover:text-white border-red-400 rounded-xl border-2"
              onClick={(e) => setOpenDialog(false)}
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              className="px-9 text-green-400 bg-white hover:bg-green-400 hover:text-white border-green-400 rounded-xl border-2"
              onClick={handleSubmit(updateDocuments)}
            >
              <span>Edit</span>
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </div>
  );
};

export default EditDocumentsModal;
