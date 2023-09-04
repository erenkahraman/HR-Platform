import mongoose from "mongoose";


const DepartmentSchema = new mongoose.Schema({
    department : { type: String },
    positions : [String],
    onGoingInterns : [{type: mongoose.Schema.Types.ObjectId, ref: 'internTest'}],
    finishedInterns : [{type: mongoose.Schema.Types.ObjectId, ref: 'internTest'}]
});

export default mongoose.models.Department || mongoose.model('Department', DepartmentSchema);