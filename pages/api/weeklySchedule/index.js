import { getMongoDb } from "../../../util/mongodb";
import WeeklySchedule from "../../../models/weeklySchedule";
import dbConnect from "../../../util/mongodb";
import Student from "../../../models/student";
const { tokenCheckFunction } = require("../auth/tokenCheck");

export default async function handler(req, res) {
  const { method } = req;
  const { token } = req.query;
  // Token CHECK
  try {
    await tokenCheckFunction(token);
  } catch (error) {
    console.error(error);
    res.status(401).json("Unauthorized User");
    return;
  }
  // Token CHECK

  if (method === "GET") {
    try {
      const token = req.query.token;
      if (!token) {
        res.status(401).json("Unauthorized User");
        return;
      }
      tokenCheckFunction(token);
      const db = await getMongoDb();
      await dbConnect();
      debugger;
      const interns = await db
      .collection("interntests")
      .aggregate([
        { $match: {} },
        {
          $lookup: {
            from: Student.collection.name,
            localField: "student",
            foreignField: "_id",
            as: "student",
          },
        },
        {
          $unwind: "$student",
        },
      ])
      .toArray();
      const weeklySchedule = await db.collection("weeklyschedules").find({}).toArray();
      const populatedWeeklySchedule = weeklySchedule.map(schedule => {
        const populatedSchedule = { ...schedule };
        for (const shift in populatedSchedule.Schedule) {
          const internIds = populatedSchedule.Schedule[shift];
          const internsNames = internIds.map(internId => {
            const intern = interns.find(intern => intern._id.toString() === internId.toString());
            if (intern && intern.student) {
              return intern.student.firstName + " " + intern.student.lastName;
            }
            return "Unknown Intern";
          });
          populatedSchedule.Schedule[shift] = internsNames;
        }
        return populatedSchedule;
      });
      res.status(200).json({weeklySchedule,populatedWeeklySchedule});
    } catch (error) {
      res.status(500).json(error);
    }
  }
  else  if (method === "POST") {
    try {
      const weeklySchedule = await WeeklySchedule.create(req.body);
      res.status(201).json(weeklySchedule);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }
  else if (method === "PUT") {
    try {
      const { scheduleGroup } = req.body.params;
      const updatedWeeklySchedule = await WeeklySchedule.findOneAndUpdate(
        { Group: scheduleGroup.Group },
        {
          $push: {
            [`Schedule.${scheduleGroup.shift}`]: scheduleGroup.internId,
          },
        },
        { new: true, upsert: true }
      );
  
      // Find the existing weekly schedule for the department
      const existingWeeklySchedule = await WeeklySchedule.findOne({
        Group: scheduleGroup.Group,
      });
  
      // Remove the intern from the previous shift
      let updatedMorningShift = existingWeeklySchedule.Schedule.morning.filter(
        (internId) => internId.toString() !== scheduleGroup.internId
      );
      let updatedAfternoonShift = existingWeeklySchedule.Schedule.afternoon.filter(
        (internId) => internId.toString() !== scheduleGroup.internId
      );
  
      // Add the intern to the new shift
      if (scheduleGroup.shift === "morning") {
        updatedMorningShift.push(scheduleGroup.internId);
      } else if (scheduleGroup.shift === "afternoon") {
        updatedAfternoonShift.push(scheduleGroup.internId);
      }
  
      // Update the weekly schedule with the new shifts
       updatedWeeklySchedule = await WeeklySchedule.findOneAndUpdate(
        { Group: scheduleGroup.Group },
        {
          $set: {
            "Schedule.morning": updatedMorningShift,
            "Schedule.afternoon": updatedAfternoonShift,
          },
        },
        { new: true, upsert: true }
      );
  
      res.status(201).json(updatedWeeklySchedule);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}