import { IncomingForm } from 'formidable';
import fs from "fs";


export const config = {
    api: {
       bodyParser: false,
    }
};
 

export default async (req,res) => {
 
        const form = new IncomingForm();
        form.uploadDir = "../../public/uploads/" + req;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log(err, fields, files);
            if (err) return res.json({error : err});
            
        });
        return res.json({error : "OK"});
}


  