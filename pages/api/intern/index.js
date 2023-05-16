import { getMongoDb } from "../../../util/mongodb";
import Intern from "../../../models/intern";
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
            $lookup: {
              from: Applicant.collection.name,
              localField: "applicant",
              foreignField: "_id",
              as: "applicant",
            },
          },
          {
            $unwind: "$intern",
          },
          {
            $unwind: "$applicant",
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
  if (method === "PUT") {
    try {
      /* const intern = await Intern.updateOne(
        // { student: req.body.params.id },
        { student: req.body.interns[0].id },
        {
          status: "Ongoing",
        }
      );  */

      
      
      await Promise.all(
        req.body.interns.map(async (eachIntern) => {
          

          const draftedIntern = req.body.drafted.filter(possibleIntern => {
            return possibleIntern.id === eachIntern._id
          })[0]


          eachIntern.attendance[draftedIntern.status].count = draftedIntern.count;
          eachIntern.attendance[draftedIntern.status].dates.push(draftedIntern.date);

          const internPromise = await Intern.findByIdAndUpdate(eachIntern._id, eachIntern);
          console.log("lets see the promise now")
          console.log(internPromise)
         
        })
        
    )
    
      res.status(200).json(req.body.interns);
    } catch (err) {
      console.log("lets see the message")
      console.log(err)
      res.status(500).json(err);
    }
  }
}
