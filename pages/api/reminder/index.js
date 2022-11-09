import { getMongoDb } from "../../../util/mongodb";
import Reminder from "../../../models/reminder";
import dbConnect from "../../../util/mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const db = await getMongoDb();
  await dbConnect();
  if (method === "GET") {
    try {
      const reminder = await Reminder.find({});
      res.status(201).json(reminder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const reminder = await Reminder.create(req.body);
      res.status(201).json(reminder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
