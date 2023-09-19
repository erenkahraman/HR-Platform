import { getMongoDb } from "../../../util/mongodb";
import dbConnect from "../../../util/mongodb";
import Attendance from "../../../models/attendance";
import Student from "../../../models/student";
import InternTest from "../../../models/internTest";
const { tokenCheckFunction } = require("../auth/tokenCheck");

export default async function handler(req, res) {
  const { method } = req;
  const db = await getMongoDb();
  await dbConnect();
  const { token } = req.query;
  console.log('Token: ', token );
  
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
      console.log('GET Token: ', token );
      if (!token) {
        res.status(401).json("Unauthorized User");
        return;
      }
      await tokenCheckFunction(token);
      await getMongoDb();
      await dbConnect();
      

      // const attendances =  await db
      // .collection("attendances")
      // .aggregate([
      //   {
      //     $lookup: {
      //       from: "interns",
      //       localField: "intern",
      //       foreignField: "_id",
      //       as: "intern",
      //     },
      //   },
      // ])
      // .toArray();
      const attendances = await Attendance.find().populate({
        path: 'internTest',
        populate: {
          path: 'student',
          model: 'Student' // Buradaki 'Student', student referansının modele göre olan adıdır.
        }
      });
      console.log("attendances: ", attendances);
      res.status(200).json(attendances);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  else if (method === "POST") {
    debugger;
    try {
      const newAttendance = await Attendance.create(req.body);
      res.status(201).json(newAttendance);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }
  else if (method === "PUT")  {
    try {
      console.log('PUT Token: ', token );

      const { attendanceGroup } = req.body.params;
      const updatedAttendance = await Attendance.findOneAndUpdate(
        { student: scheduleGroup.student },
        {
          coveredDay: attendanceGroup.coveredDay,
          present: attendanceGroup.present,
          dayOff: attendanceGroup.dayOff,
          late: attendanceGroup.late,
          excusedLeave: attendanceGroup.excusedLeave,
          sick: attendanceGroup.sick,
          unexcusedleave: attendanceGroup.unexcusedleave,
          date: attendanceGroup.date,
        },
        { new: true, upsert: true }
      );

      res.status(200).json(updatedAttendance);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else if (method === "DELETE") {
    try {
      const { Group } = req.query;
      const deletedAttendance = await Attendance.deleteOne({ _id: Group });
      res.status(200).json(deletedAttendance);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
