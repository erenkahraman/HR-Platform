import Interview from "../../../models/interview";
import dbConnect from "../../../util/mongodb";
import { getMongoDb } from "../../../util/mongodb";
import Applicant from "../../../models/applicant";

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
      const interview = await db
        .collection("interview")
        .aggregate([
          { $match: { applicationStatus: "On Process" } },
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
            $set: {
              "applicant.applicationDate": {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$applicant.applicationDate",
                },
              },
              "applicant.hrInterviewDate": {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$applicant.hrInterviewDate",
                },
              },
              "applicant.ceoInterviewDate": {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$applicant.ceoInterviewDate",
                },
              },
              "applicant.hrInterviewDone": {
                $booleanToString: {
                  value: "$applicant.hrInterviewDone",
                },
              },
              "applicant.ceoInterviewDone": {
                $boolean: {
                  value: "$applicant.ceoInterviewDone",
                },
              },
            },
          },
        ])
        .toArray();
      res.status(200).json(interview);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const interview = await Interview.create(req.body);
      res.status(201).json(interview);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
