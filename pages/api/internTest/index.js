import { getMongoDb } from "../../../util/mongodb";
import InternTest from "../../../models/internTest";
import dbConnect from "../../../util/mongodb";
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
    console.log("LOGFORTEST ------- HERE's the request body from the edit intern documents");
    console.log(req);
    console.log(token);
    console.log("LOGFORTEST - Calling for token check function");
    tokenCheckFunction(token);
  } catch (e) {
    console.log("LOGFORTEST - Token check function failed for some reason.")
    console.error(e);
    res.status(401).json("Unauthorized User");
  }
  // Token CHECK

  const db = await getMongoDb();
  await dbConnect();

  if (method === "GET") {
    try {
      // const applicant = await db
      //   .collection("students")
      //   .aggregate([
      //     { $match: { applicationStatus: "Accepted" } },
      //     {
      //       $lookup: {
      //         from: InternTest.collection.name,
      //         localField: "internTest",
      //         foreignField: "_id",
      //         as: "internTest",
      //       },
      //     },
      //     {
      //       $lookup: {
      //         from: Applicant.collection.name,
      //         localField: "applicant",
      //         foreignField: "_id",
      //         as: "applicant",
      //       },
      //     },
      //     {
      //       $unwind: "$internTest",
      //     },
      //     {
      //       $unwind: "$applicant",
      //     },
      //   ])
      //   .toArray();
      const interns = await InternTest.find().populate(['student']); 
      res.status(200).json(interns);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const intern = await InternTest.create(req.body);
      res.status(201).json(intern);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      /* const intern = await InternTest.updateOne(
        // { student: req.body.params.id },
        { student: req.body.interns[0].id },
        {
          status: "Ongoing",
        }
      );  */
        console.log("LOGFORTEST - Look! I reached the api backend!");
      
      await Promise.all(
        req.body.interns.map(async (eachIntern) => {
          
          const draftedIntern = req.body.drafted.filter(possibleIntern => {
            return possibleIntern.id === eachIntern._id
          })[0]

          eachIntern.attendance[draftedIntern.status].count = draftedIntern.count;
          eachIntern.attendance.date=draftedIntern.date;

          const internPromise = await InternTest.findByIdAndUpdate(eachIntern._id, eachIntern);
          console.log("lets see the promise now")
          console.log(internPromise)
        })
      )
    
      res.status(200).json(req.body.internTests);
    } catch (err) {
      console.log("lets see the message")
      console.log(err)
      res.status(500).json(err);
    }
  }
}
