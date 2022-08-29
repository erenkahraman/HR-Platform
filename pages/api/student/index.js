import dbConnect from "../../../util/mongodb";
import Student from "../../../models/student";

export default async function handler(req, res){
    const { method } = req;
    await dbConnect();

    if(method === 'GET'){
        try {
            const students = await Student.find({})
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    if(method === 'POST'){
        try {
            const student = await Student.create(req.body);
            res.status(201).json(student);
            
        } catch (err) {
            res.status(500).json(err)
        }
    }

}