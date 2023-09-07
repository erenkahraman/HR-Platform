import mongoose from "mongoose";

const weeklyScheduleSchema = mongoose.Schema({
  Group: { type: String, required: true },
  Schedule: {
    morning: [{ type: mongoose.Schema.Types.ObjectId, ref: "InternTest" }],
    afternoon: [{ type: mongoose.Schema.Types.ObjectId, ref: "InternTest" }],
  },
});

export default mongoose.models.WeeklySchedule ||
  mongoose.model("WeeklySchedule", weeklyScheduleSchema);
