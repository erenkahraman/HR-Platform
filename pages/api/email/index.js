import { getMongoDb } from "../../../util/mongodb";
import Email from "../../../models/email";
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
      const mail = await db
        .collection("email")
        .aggregate([
          { $match: { applicationStatus: "Accepted" } },
          {
            $lookup: {
              from: Email.collection.name,
              localField: "email",
              foreignField: "_id",
              as: "email",
            },
          }
        ])
        .toArray();
      res.status(200).json(mail);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const email = await Email.create(req.body);
      res.status(201).json(email);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const email = await Email.updateOne(
        { student: req.body.params.id },
        {
          status: "Ongoing",
        }
      );
      res.status(200).json(email.matchedCount);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
