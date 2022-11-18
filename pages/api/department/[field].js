import dbConnect from "../../../util/mongodb";
import Department from "../../../models/department";
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
        const department = await Department.findById(field);
        return res.status(200).json({
          success: true,
          data: department,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          data: error,
        });
      }
    case "PUT":
      if (req.body.type == "ONGOING") {
        try {
          const department = await Department.findByIdAndUpdate(
            field,
            { $addToSet: { onGoingInterns: req.body.onGoingInterns } },
            {
              new: true,
              runValidators: true,
            }
          );
          return res.status(200).json({
            success: true,
            data: department,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            data: error,
          });
        }
      } else if (req.body.type == "FINISHED") {
        try {
          const dprtmnt = await Department.find({
            department: { $eq: field },
          });
          const department = await Department.findByIdAndUpdate(
            dprtmnt[0]._id,
            {
              $addToSet: { finishedInterns: req.body.finishedInterns },
              $pull: { onGoingInterns: req.body.finishedInterns },
            },
            {
              new: true,
              runValidators: true,
            }
          );
          return res.status(200).json({
            success: true,
            data: department,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            data: error,
          });
        }
      }

    case "DELETE":
      try {
        const department = await Department.deleteOne({ _id: id });
        return res.status(200).json({
          success: true,
          data: department,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          data: error,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
}
