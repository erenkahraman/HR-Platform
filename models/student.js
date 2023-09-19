import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    maxlength: 40,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
    maxlength: 60,
  },
  nationality: {
    type: String,
    required: true,
    maxlength: 20,
  },
  departingCountry: {
    type: String,
    required: true,
    maxlength: 20,
  },
  applicationStatus: {
    type: String,
    enum: [
      "Accepted",
      "Rejected",
      "No Answer",
      "Intership Finished",
      "On Process",
    ],
    default: "On Process",
    required: true,
  },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "Applicant" },
  internTest: { type: mongoose.Schema.Types.ObjectId, ref: "InternTest" },
});

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
