import mongoose from "mongoose";



const ApplicantSchema =  new mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    applicationDate: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    departureDate: { type: String, required: true },
    progress: { type: String, required: true, maxlength: 30 },
    department: { type: String, required: true, maxlength: 30 },
    position: { type: String, required: true, maxlength: 30 },
    hrInterviewDate: { type: String, required: true, maxlength: 30 },
    //ceoInterviewDate: { type: String, required: true, maxlength: 30 },
    interviewNotes: { type: String, required: true },
    rejectionReasons: { type: String, required: true },
})



export default mongoose.models.Applicant || mongoose.model("Applicant", ApplicantSchema);