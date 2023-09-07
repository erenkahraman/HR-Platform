import mongoose from "mongoose";

const weeklyScheduleSchema = mongoose.Schema({
  Group: { type: String, required: true },
  Schedule: {
    morning: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }],
    afternoon: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }],
  },
});

export default mongoose.models.WeeklySchedule ||
  mongoose.model("WeeklySchedule", weeklyScheduleSchema);
