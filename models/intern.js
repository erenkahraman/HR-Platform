import mongoose from "mongoose";

const statusEnum = ["Not Submitted", "Needs Review", "Incorrect", "Correct"];

const InternSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  startDate: { type: String },
  endDate: { type: String },
  durationInWeeks: { type: Number },
  department: { type: String, maxlength: 30 },
  position: { type: String, maxlength: 30 },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  status: { type: String },
  attendance: { type: mongoose.Schema.Types.ObjectId, ref: "Attendance" },
  departure: {
    departureDate: String,
    departureTime: String,
    departureCity: String,
    pickBy: String,
  },
  documents: { type: Map, of: String },

});

export default mongoose.models.Intern || mongoose.model("Intern", InternSchema);
