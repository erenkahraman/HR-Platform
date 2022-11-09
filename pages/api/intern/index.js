import { getMongoDb } from "../../../util/mongodb";
import Intern from "../../../models/intern";
import dbConnect from "../../../util/mongodb";
import Student from "../../../models/student";

export default async function handler(req, res) {
  const { method } = req;
  const db = await getMongoDb();
  await dbConnect();

  if (method === "GET") {
    try {
      const applicant = await db
        .collection("interns")
        .aggregate([
          {
            $lookup: {
              from: Student.collection.name,
              pipeline: [{ $match: { applicationStatus: "Accepted" } }],
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
      res.status(200).json(applicant);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const intern = await Intern.create(req.body);
      res.status(201).json(intern);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
