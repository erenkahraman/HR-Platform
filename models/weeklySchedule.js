import mongoose from "mongoose";

const weeklyScheduleSchema = mongoose.Schema({
  title: { type: String },
  postedBy: { type: String },
  date: { type: String },
  paragraph: { type: String },
});

  export default mongoose.models.WeeklySchedule || mongoose.model("WeeklySchedule", weeklyScheduleSchema)