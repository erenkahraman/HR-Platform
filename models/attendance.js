import mongoose from "mongoose";

// Create a Mongoose schema for attendance
const AttendanceSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,required: true},
    coveredDay: {
        count: { type: Number, default: 0 },
        date: [{ type: Date, default: Date.now }]
    },
    present: {
        count: { type: Number, default: 0 },
        date: [{ type: Date, default: Date.now }]
    },
    dayOff: {
        count: { type: Number, default: 0 },
        date: [{ type: Date, default: Date.now }]
    },
    late: {
        count: { type: Number, default: 0 },
        date: [{ type: Date, default: Date.now }]
    },
    excusedLeave: {
        count: { type: Number, default: 0 },
        date: [{ type: Date, default: Date.now }]
    },
    sick: {
        count: { type: Number, default: 0 },
        date: [{ type: Date, default: Date.now }]
    },
    unexcusedLeave: {
        count: { type: Number, default: 0 },
        date: [{ type: Date, default: Date.now }]
    },
    date: { type: Date, default: Date.now },
    internTest: { type: mongoose.Schema.Types.ObjectId, ref: "InternTest" },
});

// Create the Mongoose model for attendance
export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
