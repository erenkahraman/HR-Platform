import { getMongoDb } from "../../../util/mongodb";
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

  if (method !== "GET") {
    res.status(400).json( { message: "Can not manipulate the statistics but only retrieve it"})
  }

    try {
      console.log("we are now in api/applicants/statistics")
      // retrieve the collection
      const applicants = db.collection("applicants")
      // get all the items so that no filter is entered
      const query = {}
      // just get the necessary fields
      const options = {
        projection : {
          interviewStatuses: 1,
          hrInterviewDate: 1,
          ceoInterviewDate: 1,
        }
      }
      const cursor = applicants.find(query,options)
      // await cursor.forEach((each) => console.log(each));
      const interviewStatuses = await cursor.toArray()
      console.log("interviewInformation:")
      console.log(interviewStatuses)
      res.status(200).json(interviewStatuses);
    } catch (error) {
      res.status(500).json(error);
    }
  }