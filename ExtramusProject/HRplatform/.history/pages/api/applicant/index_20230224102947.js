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
        .collection("students")
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
              "applicant.startDate": {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$applicant.startDate",
                },
              },
              "applicant.endDate": {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$applicant.endDate",
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
              dateOfBirth: {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$dateOfBirth",
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
    /*try {
      const applicant = await Applicant.create(req.body);
      res.status(201).json(applicant);
    } catch (err) {
      res.status(500).json(err);
    }*/
    res.status(201).json({data:"success"});
  }
  
}
