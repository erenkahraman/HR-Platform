import { getMongoDb } from "../../../util/mongodb";
import WeeklySchedule from "../../../models/weeklySchedule";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";
import Student from "../../../models/student";

export default async function handler(req, res) {
  const { method } = req;
  const db = await getMongoDb();
  await dbConnect();
  // Token CHECK
  let token = req.query.token
    ? req.query.token
    : req.body.token
    ? req.body.token
    : "";
  try {
    tokenCheckFunction(token);
  } catch (e) {

    res.status(401).json("Unauthorized User");
    console.error(e);
  }
  // Token CHECK

  if (method === "GET") {
    try {
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
  else if (method === "PUT") {
    try {
      console.log(req.body.params.scheduleGroup);
      const { scheduleGroup } = req.body.params;
      const updatedWeeklySchedule = await WeeklySchedule.findOneAndUpdate(
        { Group: scheduleGroup.Group },
        {
          Group: scheduleGroup.Group,
          Schedule: scheduleGroup.Schedule,
        },
        { new: true }
      );

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
