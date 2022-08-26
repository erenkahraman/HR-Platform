import dbConnect  from "../../../util/mongodb";
import Student from "../../../models/student";

export default async function handler(req, res){
    const { method } = req;
    const db = await dbConnect();

    if(method === 'GET'){
        try {
            const students = await Student.find({ applicationStatus: 'On Process'})
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}