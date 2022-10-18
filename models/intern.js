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
    statusOfTheDay: { type: String, default: '' },
    present: {
      count: { type: Number, default: 0 },
      dates: Array
    },
    dayOff: {
      count: { type: Number, default: 0 },
      dates: Array
    },
    late: {
      count: { type: Number, default: 0 },
      dates: Array
    },
    excusedLeave: {
      count: { type: Number, default: 0 },
      dates: Array
    },
    sick: {
      count: { type: Number, default: 0 },
      dates: Array
    },
    unexcusedleave: {
      count: { type: Number, default: 0 },
      dates: Array
    }
  },
});

export default mongoose.models.Intern || mongoose.model("Intern", InternSchema);
