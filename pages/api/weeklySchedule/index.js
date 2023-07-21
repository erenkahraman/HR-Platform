import { getMongoDb } from "../../../util/mongodb";
import WeeklySchedule from "../../../models/weeklySchedule";
import dbConnect from "../../../util/mongodb";
import Student from "../../../models/student";
const { tokenCheckFunction } = require("../auth/tokenCheck");

export default async function handler(req, res) {
  const { method } = req;
  const db = await getMongoDb();
  await dbConnect();
  console.log("Token Value weeklyschedule index =", req.query.token);
  // Token CHECK
  try {
    await tokenCheckFunction(req.query.token);
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
  if (method === "POST") {
    try {
      const weeklySchedule = await WeeklySchedule.create(req.body);
      res.status(201).json(weeklySchedule);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }
  if (method === "PUT") {
    try {
      console.log(req.body.params.scheduleGroup);
      const weeklySchedule = await WeeklySchedule.updateOne(
        {
          Group: req.body.params.scheduleGroup.Group,
        },
        {
          $set: {
            Group: req.body.params.scheduleGroup.Group,
            Schedule: {
              monday: {
                shift: req.body.params.scheduleGroup.Schedule.shift,
              },
              tuesday: {
                shift: req.body.params.scheduleGroup.Schedule.shift,
              },
              wednesday: {
                shift: req.body.params.scheduleGroup.Schedule.shift,
              },
              thursday: {
                shift: req.body.params.scheduleGroup.Schedule.shift,
              },
              friday: {
                shift: req.body.params.scheduleGroup.Schedule.shift,
              },
            },
          },
        }
      );

      res.status(201).json(weeklySchedule);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
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