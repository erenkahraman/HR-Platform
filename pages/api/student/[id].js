import Student from "../../../models/student";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { id },
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
    case "GET":
      try {
        const student = await Student.findById(id);
        return res.status(200).json({
          success: true,
          data: student,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          data: error,
        });
      }
    case "PUT":
      try {
        const student = await Student.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        return res.status(200).json({
          success: true,
          data: student,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          data: error,
        });
      }
    case "DELETE":
      try {
        const student = await Student.deleteOne({ _id: id });
        return res.status(200).json({
          success: true,
          data: student,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          data: error,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
}
