import { getMongoDb } from "../../../util/mongodb";
import WhatsNew from "../../../models/whatsNew";
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