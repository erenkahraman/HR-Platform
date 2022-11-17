import { getMongoDb } from "../../../util/mongodb";
import Applicant from "../../../models/applicant";
import Student from "../../../models/student";
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

  if (method === "GET") {
    try {
      const applicant = await db
        .collection("students")
        .aggregate([
          {
            $lookup: {
              from: Applicant.collection.name,
              localField: "applicant",
              foreignField: "_id",
              as: "applicant",
            },
          },
          {
            $unwind: "$applicant",
          },
          {
            $project: {
              firstName: 1,
              lastName: 1,
              dateOfBirth: 1,
              "applicant.position": 1,
              date: {
                $dateFromString: {
                  dateString: "$dateOfBirth",
                  format: "%d-%m-%Y",
                },
              },
            },
          },
          {
            $match: {
              $expr: {
                $eq: [{ $month: "$date" }, { $month: new Date() }],
              },
            },
          },
          {
            $sort: {
              date: 1,
            },
          },
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              dateOfBirth: 1,
              "applicant.position": 1,
              month: { $month: "$date" },
              day: { $dayOfMonth: "$date" },
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
