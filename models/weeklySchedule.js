import mongoose from "mongoose";

const weeklyScheduleSchema = mongoose.Schema({
  Group: { type: String, required: true },
  Interns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }],
  Schedule: {
    monday:  { shift: { type: String,
      enum:['Morning', 'Afternoon'],
      required: true} },
    tuesday:  { shift: { type: String,
      enum:['Morning', 'Afternoon'],
      required: true} },
    wednesday:  { shift: { type: String,
      enum:['Morning', 'Afternoon'],
      required: true} },
    thursday:  { shift: { type: String,
      enum:['Morning', 'Afternoon'],
      required: true} },
    friday: { shift: { type: String,
      enum:['Morning', 'Afternoon'],
      required: true} } },
  });

export default mongoose.models.WeeklySchedule ||
  mongoose.model("WeeklySchedule", weeklyScheduleSchema);
