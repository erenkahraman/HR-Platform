import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    department : { type: String },
    positions : [String]
});

export default mongoose.models.Department || mongoose.model('Department', DepartmentSchema);