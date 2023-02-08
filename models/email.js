import mongoose from "mongoose";


const EmailSchema = new mongoose.Schema({
    from : { type: String },
    to : { type: String },
    message : { type: String }
});

export default mongoose.models.Email || mongoose.model('Email', EmailSchema);