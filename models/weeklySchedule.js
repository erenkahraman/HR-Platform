import mongoose from "mongoose";

const weeklyScheduleSchema = mongoose.Schema({
  Group: { type: String, required: true },
  Schedule: {
    monday: { morning: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }], afternoon: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }] },
    tuesday: { morning: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }], afternoon: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }] },
    wednesday: { morning: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }], afternoon: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }] },
    thursday: { morning: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }], afternoon: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }] },
    friday: { morning: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }], afternoon: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }] },
  },
});

export default mongoose.models.WeeklySchedule ||
  mongoose.model("WeeklySchedule", weeklyScheduleSchema);