import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  applicationDate: { type: Date, required: true },
  hrInterviewDate: { type: Date, required: true, maxlength: 30 },
  ceoInterviewDate: { type: Date, required: true, maxlength: 30 },
  hrInterviewDone: { type: Boolean },
  ceoInterviewDone: { type: Boolean },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});

export default mongoose.models.Interview ||
  mongoose.model("Interview", InterviewSchema);
