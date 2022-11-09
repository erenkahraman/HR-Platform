import { getMongoDb } from "../../../util/mongodb";
import Intern from "../../../models/intern";
import dbConnect from "../../../util/mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const db = await getMongoDb();
  await dbConnect();
  if (method === "GET") {
    try {
      const intern = await Intern.find({});
      res.status(201).json(intern);
    } catch (err) {
      res.status(500).json(err);
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
}
