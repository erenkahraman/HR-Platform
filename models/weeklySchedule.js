import mongoose from "mongoose";

const weeklyScheduleSchema = mongoose.Schema({
  Group: { type: String, required: true },
  Interns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }],
  Schedule: {
    monday: { shift: { type: String } },
    tuesday: { shift: { type: String }  },
    wednesday: { shift: { type: String } },
    thursday: { shift: { type: String } },
    friday: { shift: { type: String } },
  },
});

export default mongoose.models.WeeklySchedule ||
  mongoose.model("WeeklySchedule", weeklyScheduleSchema);
