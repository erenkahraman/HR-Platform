import { getMongoDb } from "../../../util/mongodb";
import WeeklySchedule from "../../../models/weeklySchedule";
import Intern from "../../../models/intern";
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
      debugger;
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

      
    // Log the fetched interns data
     // console.log("Fetched interns data:", interns);

      // const interns = await db
      //   .collection("interns")
      //   .aggregate([
      //     { $match: {} },
      //     {
      //       $lookup: {
      //         from: Student.collection.name,
      //         localField: "student",
      //         foreignField: "_id",
      //         as: "student",
      //       },
      //     },
      //     {
      //       $unwind: "$student",
      //     },
      //   ])
      //   .toArray();
      // const weeklySchedules = await WeeklySchedule.find()
      // .populate({
      //   path: "Schedule.monday.morning Schedule.monday.afternoon Schedule.tuesday.morning Schedule.tuesday.afternoon Schedule.wednesday.morning Schedule.wednesday.afternoon Schedule.thursday.morning Schedule.thursday.afternoon Schedule.friday.morning Schedule.friday.afternoon",
      //   model: Intern,
      // })
      // .exec();
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
  else  if (method === "PUT") {
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