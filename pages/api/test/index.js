import { getMongoDb } from "../../../util/mongodb";
import Applicant from "../../../models/applicant";
import Student from "../../../models/student";


export default async function handler(req, res) {
    const { method } = req;
    const db = await getMongoDb();

    if (method === 'GET') {
        try {
            const applicant = await db
                .collection('students')
                .aggregate([
                    {
                        $lookup: {
                            from: Applicant.collection.name,
                            localField: 'applicant',
                            foreignField: '_id',
                            as: 'applicant'
                        }
                    },
                    {
                        $unwind: '$applicant',
                    },
                    {
                        $project: {
                            "_id": 1,
                            "firstName": 1,
                            "lastName": 1,
                            "dateOfBirth": 1,
                            "applicant.position": 1,
                        }
                    }
                ]).toArray();
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