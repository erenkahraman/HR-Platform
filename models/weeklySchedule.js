import mongoose from "mongoose";

const weeklyScheduleSchema = mongoose.Schema({
  Group: { type: String, required: true },
  Interns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intern" }],
  Schedule: {
    monday: { type: String, 
              enum:['Morning', 'Afternoon'],
              required: true},
    tuesday: { type: String, 
      enum:['Morning', 'Afternoon'],
      required: true},
    wednesday: { type: String, 
      enum:['Morning', 'Afternoon'],
      required: true},
    thursday: { type: String, 
      enum:['Morning', 'Afternoon'],
      required: true},
    friday: { type: String, 
      enum:['Morning', 'Afternoon'],
      required: true},
  },
});

export default mongoose.models.WeeklySchedule ||
  mongoose.model("WeeklySchedule", weeklyScheduleSchema);
