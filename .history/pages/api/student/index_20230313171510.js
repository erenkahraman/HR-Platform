import { getMongoDb } from "../../../util/mongodb";
import Student from "../../../models/student";
import Applicant from "../../../models/applicant";
import Intern from "../../../models/intern";
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
      const students = await db
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
            $lookup: {
              from: Intern.collection.name,
              localField: "intern",
              foreignField: "_id",
              as: "intern",
            },
          },
          {
            $unwind: "$applicant",
          },
          {
            $set: {
              dateOfBirth: {
                $dateToString: { format: "%d/%m/%Y", date: "$dateOfBirth" },
              },
              "applicant.startDate": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$applicant.startDate",
                },
              },
              "applicant.applicationDate": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$applicant.applicationDate",
                },
              },
              "applicant.endDate": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$applicant.endDate",
                },
              },
              "applicant.hrInterviewDate": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$applicant.hrInterviewDate",
                },
              },
              "applicant.ceoInterviewDate": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$applicant.ceoInterviewDate",
                },
              },
            },
          },
        ])
        .toArray();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    //console.log(req.body)
    try {
      const student = await Student.create(req.body);
      res.status(201).json({
        "_id": {
          "$oid": "639717ff6fe402ce37ed8c1f"
        },
        "firstName": "mehmet",
        "lastName": "koc",
        "email": "asdfgh@gmail.com",
        "dateOfBirth": {
          "$date": {
            "$numberLong": "1672347600000"
          }
        },
        "sex": "Male",
        "phoneNumber": "2345674543",
        "university": "halic uni",
        "nationality": "Azerbaijan",
        "departingCountry": "Austria",
        "applicationStatus": "Accepted",
        "applicant": {
          "$oid": "639717ff6fe402ce37ed8c1e"
        },
        "__v": 0,
        "intern": {
          "$oid": "639830a9e234a7b056b66df5"
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
