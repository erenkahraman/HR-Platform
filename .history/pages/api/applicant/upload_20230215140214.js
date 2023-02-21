import { IncomingForm } from 'formidable';
import fs from "fs";


export const config = {
    api: {
       bodyParser: false,
    }
};
 

export default async (req,res) => {
 const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.uploadDir = "../../public/uploads/";
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log(err, fields, files);
            if (err) return reject(err);
            resolve(files);
        });
    });
res.json(data)
}


  