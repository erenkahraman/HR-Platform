import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  title: { type: String },
  category: { type: String },
  date: { type: String },
  whoPosted: { type: String },
});

export default mongoose.models.Reminder ||
  mongoose.model("Reminder", ReminderSchema);
