import { getMongoDb } from "../../../util/mongodb";
import Applicant from "../../../models/applicant";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";

export default async function handler(req, res) {
  const { method } = req;

  // Token CHECK

  let token = req.query.token || req.body.token || "";
  console.log("TAPPLICATION INTERN TOKEN:",token);

  try {
    tokenCheckFunction(token);
  } catch (e) {
    console.error(e);
    return res.status(401).json("Unauthorized User");
  }

  // Token CHECK

  await dbConnect();
  const db = await getMongoDb();

  if (method === "GET") {
    try {
      const applicants = await db
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

      return res.status(200).json(applicants);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "POST") {
    try {
      const applicant = await Applicant.create(req.body);
      return res.status(201).json(applicant);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "PUT") {
    try {
      const { id } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: "Missing 'id' in request body" });
      }
  
      const updatedApplicant = await Applicant.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedApplicant) {
        return res.status(404).json({ error: "Applicant not found" });
      }
  
  
      return res.status(200).json({
        success: true,
        data: updatedApplicant,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  return res.status(405).json({ error: "Method Not Allowed" });
}
