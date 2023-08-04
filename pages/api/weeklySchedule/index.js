import { getMongoDb } from "../../../util/mongodb";
import WeeklySchedule from "../../../models/weeklySchedule";
import dbConnect from "../../../util/mongodb";
import Student from "../../../models/student";
const { tokenCheckFunction } = require("../auth/tokenCheck");

export default async function handler(req, res) {
  const { method } = req;
  const db = await getMongoDb();
  await dbConnect();
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
      
      const interns = await db
        .collection("interns")
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
      res.status(200).json(interns);
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
  else if (method === "PUT")  {
    try {
      console.log(req.body.params.scheduleGroup);
      const { scheduleGroup } = req.body.params;
      const updatedWeeklySchedule = await WeeklySchedule.findOneAndUpdate(
        { Group: scheduleGroup.Group },
        {
          // Corrected code: Use $set operator to update the specific fields
          $set: {
            Group: scheduleGroup.Group,
            Schedule: {
              monday: {
                shift: scheduleGroup.Schedule.monday.shift,
              },
              tuesday: {
                shift: scheduleGroup.Schedule.tuesday.shift,
              },
              wednesday: {
                shift: scheduleGroup.Schedule.wednesday.shift,
              },
              thursday: {
                shift: scheduleGroup.Schedule.thursday.shift,
              },
              friday: {
                shift: scheduleGroup.Schedule.friday.shift,
              },
            },
            Interns: scheduleGroup.Interns, // This should be an array of interns' ObjectIds
          },
        },
        // Corrected code: Set the options 'new' and 'upsert' to true for correct behavior
        { new: true, upsert: true }
      );

      await updatedWeeklySchedule.addInternNames();

      res.status(201).json(updatedWeeklySchedule);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else if (method === "DELETE") {
    try {
      console.log(req.query.Group);
      const weeklySchedule = await WeeklySchedule.deleteOne({
        Group: req.query.Group,
      });

      res.status(201).json(weeklySchedule);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}