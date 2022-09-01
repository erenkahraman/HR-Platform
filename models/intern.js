import mongoose from "mongoose";

const Student = require("./student");

const InternSchema = Student.discriminator(
  "Intern",
  new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    startDate: { type: String },
    endDate: { type: String },
    durationInWeeks: { type: Number },
    departement: { type: String, maxlength: 30 },
    position: { type: String, maxlength: 30 },
    // attendance: {
    //   date: { type: String },
    //   present: { type: Integer },
    //   late: { type: Integer },
    //   dayOff: { type: Integer },
    //   excusedLeave: { type: Integer },
    //   sick: { type: Integer },
    //   unexcusedLeave: { type: Integer },
    // },
  })
);

export default mongoose.models.InternSchema ||
  mongoose.model("Intern", InternSchema);
