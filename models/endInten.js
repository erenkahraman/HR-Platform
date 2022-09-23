import mongoose from "mongoose";

const EndIntern = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});

export default mongoose.models.EndIntern ||
  mongoose.model("EndIntern", EndIntern);
