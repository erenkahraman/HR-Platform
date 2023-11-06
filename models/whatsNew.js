import mongoose from "mongoose";

const WhatsNewSchema = new mongoose.Schema({
  title: { type: String },
  postedBy: { type: String },
  date: { type: Date, required: true },
  paragraph: { type: String },
});

export default mongoose.models.WhatsNew ||
  mongoose.model("WhatsNew", WhatsNewSchema);
