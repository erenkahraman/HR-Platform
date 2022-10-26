import mongoose from "mongoose";

//const statusEnum = ["Not Submitted", "Needs Review", "Incorrect", "Correct"];

const ApplicantSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  applicationDate: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  arrivalTime: { type: String },
  arrivalCity: { type: String },
  pickUpBy: { type: String, default: "Francesco di Marco" },
  progress: { type: String, required: true, maxlength: 30 },
  department: { type: String, required: true, maxlength: 30 },
  position: { type: String, required: true, maxlength: 30 },
  hrInterviewDate: { type: String, required: true, maxlength: 30 },
  ceoInterviewDate: { type: String, required: true, maxlength: 30 },
  interviewNotes: { type: String, required: true },
  rejectionReasons: { type: String, required: true },
  documents: [{type: Map, of: String}],
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});

export default mongoose.models.Applicant || mongoose.model("Applicant", ApplicantSchema);