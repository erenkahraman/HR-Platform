import mongoose from "mongoose";

const Student = require('./student')

const InternSchema = Student.discriminator('Intern', new mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    startDate: { type: String },
    endDate: { type: String },
    durationInWeeks: { type: Number },
    departement: { type: String, maxlength: 30 },
    position: { type: String, maxlength: 30 }
}))

export default mongoose.models.InternSchema || mongoose.model("Intern", InternSchema);