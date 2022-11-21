import mongoose from "mongoose";


const DepartmentSchema = new mongoose.Schema({
    department : { type: String },
    positions : [String],
    onGoingInterns : [{type: mongoose.Schema.Types.ObjectId, ref: 'intern'}],
    finishedInterns : [{type: mongoose.Schema.Types.ObjectId, ref: 'intern'}]
});

export default mongoose.models.Department || mongoose.model('Department', DepartmentSchema);