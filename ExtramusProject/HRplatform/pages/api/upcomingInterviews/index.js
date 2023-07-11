import { getMongoDb } from "../../../util/mongodb";
import Applicant from "../../../models/applicant";
import Student from "../../../models/student";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";

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
    console.error(e);
    res.status(401).json("Unauthorized User");
  }
  // Token CHECK

  if (method === "GET") {
    try {
      const todayDate = new Date();
      const applicants = await db
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
          { $match: { "applicant.hrInterviewDate" : { $gt: todayDate }  } },
          
        ])
        .toArray();
      res.status(200).json(applicants);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
}


