import Applicant from "../models/applicant"
import { getMongoDb } from "../util/mongodb";

export async function getAllApplicants() {
    const db = await getMongoDb();
    return db
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
        ]).toArray()
}