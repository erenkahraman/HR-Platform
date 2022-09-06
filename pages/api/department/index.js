import dbConnect from "../../../util/mongodb";
import Department from "../../../models/department";

export default async function handler(req, res){
    await dbConnect();
    const { method } = req;

    if(method === 'GET'){
        try {
            const department = await Department.find({})
            res.status(200).json(department);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    if(method === 'POST'){
        try {
            const department = await Department.create(req.body);
            res.status(201).json(department);
            
        } catch (err) {
            res.status(500).json(err)
        }
    }
}