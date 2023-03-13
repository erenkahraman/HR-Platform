import mongoose from "mongoose";


const DocumentSchema = new mongoose.Schema({
    name : { type: String },
    type : { type: String }
    
});

export default mongoose.models.Department || mongoose.model('Department', DocumentSchema);