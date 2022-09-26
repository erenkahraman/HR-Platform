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
    present: { type: Number, default: 0, date: "" },
    dayOff: { type: Number, default: 0, date: "" },
    late: { type: Number, default: 0, date: "" },
    excusedLeave: { type: Number, default: 0, date: "" },
    sick: { type: Number, default: 0, date: "" },
    unexcusedleave: { type: Number, default: 0, date: "" },
  },
});

export default mongoose.models.Intern || mongoose.model("Intern", InternSchema);
