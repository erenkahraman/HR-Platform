import mongoose from "mongoose";

//const statusEnum = ["Not Submitted", "Needs Review", "Incorrect", "Correct"];

const ApplicantSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  applicationDate: { type: Date, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  arrivalTime: { type: String },
  arrivalCity: { type: String },
  pickUpBy: { type: String },
  progress: { type: String, required: true, maxlength: 30 },
  department: { type: String, required: true, maxlength: 80 },
  position: { type: String, required: true, maxlength: 30 },
  hrInterviewDate: { type: Date, required: true, maxlength: 30 },
  ceoInterviewDate: { type: Date, required: true, maxlength: 30 },
  interviewNotes: { type: String },
  rejectionReasons: { type: String },
  documents: { type: Map, of: String },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  /* interviewStatuses : {
    isHrInterviewDone : { type: Boolean, default : false },
    isDepartmentInterviewDone : { type: Boolean, default : false },
    isCeoInterviewDone : { type: Boolean, default : false },
  } */
  hrInterviewStatus : {type: Boolean, default : false},
  departmentInterviewStatus : {type: Boolean, default : false},
  ceoInterviewStatus : {type: Boolean, default : false}
});



export default mongoose.models.Applicant ||
  mongoose.model("Applicant", ApplicantSchema);
