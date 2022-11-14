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
        case 'GET':
            try {
                const department = await Department.findById(id);
                return res.status(200).json({
                    success: true,
                    data: department
                })
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    data: error
                })
            }
        case 'PUT':
            try {
                const department = await Department.findByIdAndUpdate(id, {$addToSet: {positions: req.body}}, {
                    new: true,
                    runValidators: true,
                });
                return res.status(200).json({
                    success: true,
                    data: department
                })
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    data: error
                })
            }
            case 'POST':
            try {
                const department = await Department.findByIdAndUpdate(id, {$addToSet: {interns: req.body}}, {
                    new: true,
                    runValidators: true,
                });
                return res.status(200).json({
                    success: true,
                    data: department
                })
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    data: error
                })
            }
        case 'DELETE':
            try {
                const department = await Department.deleteOne({ _id: id });
                return res.status(200).json({
                    success: true,
                    data: department
                })
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    data: error
                })
            }
        default:
            res.setHeaders("Allow", ["GET", "POST", "PUT", "DELETE"]);
            return res
                .status(405)
                .json({ success: false })
                .end(`Method ${method} Not Allowed`);

    }

}
