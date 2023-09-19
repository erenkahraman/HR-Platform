import { MongoClient } from "mongodb";

export default async function getBirthdays() {

    const db = await MongoClient();

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

}