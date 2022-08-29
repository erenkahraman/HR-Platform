import dbConnect from "../../../util/mongodb";
import Applicant from "../../../models/applicant";
import Student from "../../../models/student";
 

export default async function handler(req, res){
    const { method } = req;
    await dbConnect();

    if(method === 'GET'){
        try {
            const applicant = await Applicant.find({})
            res.status(200).json(applicant);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    if(method === 'POST'){
        try {
            const applicant = await Applicant.create(req.body);
            res.status(201).json(applicant);
            
        } catch (err) {
            res.status(500).json(err)
        }
    }
}