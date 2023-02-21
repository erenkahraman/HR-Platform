import { IncomingForm } from 'formidable';
import fs from "fs";

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 

export default data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.uploadDir = "../../public/uploads/";
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(err, fields, files);
        if (err) return reject(err);
        resolve(err);
    });
});
  