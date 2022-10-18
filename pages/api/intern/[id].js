import Intern from "../../../models/intern";
import dbConnect from "../../../util/mongodb";


export default async function handler (req, res) {

    await dbConnect();

    const {
        query: {id},
        method
    } = req;

    switch (method) {
        case 'PUT':
            try {
                const intern = await Intern.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                return res.status(200).json({
                    success: true,
                    data: intern
                })
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    data: error
                })
            }
        default:
            res.setHeaders("Allow", ["GET", "PUT", "DELETE"]);
            return res
                .status(405)
                .json({ success: false })
                .end(`Method ${method} Not Allowed`);

    }
}
