import { getMongoDb } from "../../../util/mongodb";
import WhatsNew from "../../../models/whatsNew";
import dbConnect from "../../../util/mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const db = await getMongoDb();
  await dbConnect();
  if (method === "GET") {
    try {
      const whatsNew = await WhatsNew.find({});
      res.status(201).json(whatsNew);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const whatsNew = await WhatsNew.create(req.body);
      res.status(201).json(whatsNew);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
