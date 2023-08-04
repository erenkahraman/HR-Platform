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

weeklyScheduleSchema.methods.addInternNames = async function () {
  const internNames = await Student.find(
    { _id: { $in: this.Interns } },
    "firstName lastName"
  );
  this.Interns = internNames.map((student) => student.firstName + " " + student.lastName);
  await this.save();
};

export default mongoose.models.WeeklySchedule ||
  mongoose.model("WeeklySchedule", weeklyScheduleSchema);