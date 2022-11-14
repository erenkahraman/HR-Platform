import dbConnect from "../../../util/mongodb";
import Department from "../../../models/department";

export default async function handler (req, res) {

    await dbConnect();

    const {
        query: {id},
        method
    } = req;

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