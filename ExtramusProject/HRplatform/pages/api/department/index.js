import dbConnect from "../../../util/mongodb";
import Department from "../../../models/department";
import { tokenCheckFunction } from "../auth/tokenCheck";

export default async function handler(req, res) {
  await dbConnect();
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

  if (method === "GET") {
    try {
      const department = await Department.find({});
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "POST") {
    try {
      const department = await Department.create(req.body);
      res.status(201).json(department);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
