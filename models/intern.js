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
});

export default mongoose.models.Intern || mongoose.model("Intern", InternSchema);
