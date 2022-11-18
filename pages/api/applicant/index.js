import { getMongoDb } from "../../../util/mongodb";
import Applicant from "../../../models/applicant";
import Student from "../../../models/student";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";

export default async function handler(req, res) {
  const { method } = req;

  // Token CHECK
  let token = req.query.token
    ? req.query.token
    : req.body.token
    ? req.body.token
    : "";
  try {
    tokenCheckFunction(token);
  } catch (e) {
    console.error(e);
    res.status(401).json("Unauthorized User");
  }
  // Token CHECK

  const db = await getMongoDb();
  await dbConnect();

  if (method === "GET") {
    try {
      const applicant = await db
        .collection("applicants")
        .aggregate([
          {
            $lookup: {
              from: Student.collection.name,
              pipeline: [{ $match: { applicationStatus: "On Process" } }],
              localField: "student",
              foreignField: "_id",
              as: "student",
            },
          },
          {
            $unwind: "$student",
          },
          {
            $set: {
              applicationDate: {
                $dateToString: { format: "%d/%m/%Y", date: "$applicationDate" },
              },
              startDate: {
                $dateToString: { format: "%d/%m/%Y", date: "$startDate" },
              },
              endDate: {
                $dateToString: { format: "%d/%m/%Y", date: "$endDate" },
              },
              hrInterviewDate: {
                $dateToString: { format: "%d/%m/%Y", date: "$hrInterviewDate" },
              },
              ceoInterviewDate: {
                $dateToString: {
                  format: "%d-%m-%Y",
                  date: "$ceoInterviewDate",
                },
              },
              "student.dateOfBirth": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$student.dateOfBirth",
                },
              },
            },
          },
        ])
        .toArray();
      res.status(200).json(applicant);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const applicant = await Applicant.create(req.body);
      res.status(201).json(applicant);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
