import mongoose from "mongoose";


const DocumentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    student : String,
    folder: [{
       name: String,
       path: String,
       type: String 
    }]
});

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);