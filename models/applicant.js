import mongoose from "mongoose";


const statusEnum = ['Not Submitted', 'Need Review', 'Incorrect', 'Correct'];
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
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    documents : {
        curiculumVitae : { type: String, enum: statusEnum, default: 'Not Submitted'},
        learningAgreement : { type: String, enum: statusEnum, default: 'Not Submitted'},
        acceptanceLetter : { type: String, enum: statusEnum, default: 'Not Submitted'},
        accommodationLetter : { type: String, enum: statusEnum, default: 'Not Submitted'},
        arrivalTickets : { type: String, enum: statusEnum, default: 'Not Submitted'},
        internDevelopmentPlan : { type: String, enum: statusEnum, default: 'Not Submitted'},
        confidentialityLetter : { type: String, enum: statusEnum, default: 'Not Submitted'},
        identification : { type: String, enum: statusEnum, default: 'Not Submitted'},
    }
})



export default mongoose.models.Applicant || mongoose.model("Applicant", ApplicantSchema);