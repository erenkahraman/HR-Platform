import mongoose from "mongoose";


const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        maxlength: 40
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true,
        maxlength: 60
    },
    nationality: {
        type: String,
        required: true,
        maxlength: 20
    },
    departingCountry: {
        type: String,
        required: true,
        maxlength: 20
    },
    applicationStatus: {
        type: String,
        enum: ['Accepted', 'Rejected', 'No Answer', 'Intership Finished','On Process'],
        default: 'On Process',
        required: true
    },
    applicant: {
        applicationDate: { type: String, required: true },
        arrivalDate: { type: String, required: true },
        departureDate: { type: String, required: true },
        progress: { type: String, required: true, maxlength: 30 },
        department: { type: String, required: true, maxlength: 30 },
        position: { type: String, required: true, maxlength: 30 },
        hrInterviewDate: { type: String, required: true, maxlength: 30 },
        //ceoInterviewDate: { type: String, required: true, maxlength: 30 },
        interviewNotes : { type: String, required: true },
        rejectionReasons: { type: String, required: true }
    },
    intern: {
        startDate: { type: String },
        endDate: { type: String },
        durationInWeeks: { type: Number },
        departement: { type: String, maxlength: 30 },
        position: { type: String, maxlength: 30 }
    }

})

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);