import mongoose from "mongoose";

// Create a Mongoose schema for attendance
const AttendanceSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,required: true},
    coveredDay: {type: Number,default: 0},
    present: {type: Number,default: 0},
    dayOff: {type: Number,default: 0},
    late: {type: Number,default: 0},
    excusedLeave: {type: Number,default: 0},
    sick: {type: Number,default: 0},
    unexcusedleave: {type: Number,default: 0},
    date: { type: Date, default: Date.now },
    internTest: { type: mongoose.Schema.Types.ObjectId, ref: "InternTest" },
});

// Create the Mongoose model for attendance
export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
