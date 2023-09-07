import WeeklySchedule from "../../../models/weeklySchedule";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { _id },
    method,
  } = req;

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

  switch (method) {
    case "DELETE":
      try {
        const { id } = req.query;
  
        const result = await WeeklySchedule.findByIdAndRemove(id);
  
        if (!result) {
          return res.status(404).json({ success: false, message: "NO ACCOUNT" });
        }
  
        return res.status(200).json({ success: true, message: "SUCCESS" });
      } catch (error) {
        console.error( error);
        return res.status(500).json({ success: false, message: "ERROR" });
      }
  
    default:
      res.setHeader("Allow", ["DELETE"]);
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
  
}