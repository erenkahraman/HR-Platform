import mongoose from "mongoose";
import Intern from "./intern.js";

const StatisticsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

export default mongoose.models.Statistics || mongoose.model("Statistics", StatisticsSchema);