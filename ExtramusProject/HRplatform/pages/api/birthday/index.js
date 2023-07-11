import { getMongoDb } from "../../../util/mongodb";
import Intern from "../../../models/intern";
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
          { $match: { applicationStatus: "Accepted" } },
          {
            $lookup: {
              from: Intern.collection.name,
              localField: "intern",
              foreignField: "_id",
              as: "intern",
            },
          },
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              dateOfBirth: 1,
              "intern.position": 1,
              month: { $month: "$dateOfBirth" },
              day: { $dayOfMonth: "$dateOfBirth" },
            },
          },
          {
            $match: {
              $expr: {
                $eq: [{ $month: "$dateOfBirth" }, { $month: new Date() }],
              },
            },
          },
          {
            $sort: {
              date: 1,
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
