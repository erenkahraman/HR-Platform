import mongoose from "mongoose";


const EmailSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    from : { type: String },
    to : { type: String },
    message : { type: String },
    date : {type: Date }
});

export default mongoose.models.Email || mongoose.model('Email', EmailSchema);