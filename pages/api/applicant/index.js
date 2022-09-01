import { getMongoDb } from "../../../util/mongodb";
import Applicant from "../../../models/applicant";
import Student from "../../../models/student";
import dbConnect from "../../../util/mongodb";


export default async function handler(req, res) {
    const { method } = req;
    const db = await getMongoDb();
    await dbConnect();

    if (method === 'GET') {
        try {
            const applicant = await db
                .collection('applicants')
                .aggregate([
                    {
                        $lookup: {
                            from: Student.collection.name,
                            localField: 'student',
                            foreignField: '_id',
                            as: 'student'
                        }
                    },
                    {
                        $unwind: '$student',
                    },
                ]).toArray()
            res.status(200).json(applicant);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    if (method === 'POST') {
        try {
            const applicant = await Applicant.create(req.body);
            res.status(201).json(applicant);

        } catch (err) {
            res.status(500).json(err)
        }
    }
}