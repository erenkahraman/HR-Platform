import { getMongoDb } from "../../../util/mongodb";
import InternTest from "../../../models/internTest";
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
      const internTest = await InternTest.find({});
      res.status(201).json(internTest);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const internTest = await Intern.create(req.body);
      res.status(201).json(internTest);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
