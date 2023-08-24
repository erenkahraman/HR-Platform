import mongoose from "mongoose";

const EndIntern = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  internTest: { type: mongoose.Schema.Types.ObjectId, ref: "InternTest" },
});

export default mongoose.models.EndIntern ||
  mongoose.model("EndIntern", EndIntern);
