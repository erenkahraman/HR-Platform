import mongoose from "mongoose";

const InternSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  startDate: { type: String },
  endDate: { type: String },
  durationInWeeks: { type: Number },
  departement: { type: String, maxlength: 30 },
  position: { type: String, maxlength: 30 },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  attendance: {
    date: { type: String, default: 0 },
    present: { type: String, default: 0 },
    dayOff: { type: String, default: 0 },
    late: { type: String, default: 0 },
    excusedLeave: { type: String, default: 0 },
    sick: { type: String, default: 0 },
    unexcusedleave: { type: String, default: 0 },
  },
});

export default mongoose.models.Intern || mongoose.model("Intern", InternSchema);
