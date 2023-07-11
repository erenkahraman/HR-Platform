import mongoose from "mongoose";

const EndIntern = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  intern: { type: mongoose.Schema.Types.ObjectId, ref: "Intern" },
});

export default mongoose.models.EndIntern ||
  mongoose.model("EndIntern", EndIntern);
