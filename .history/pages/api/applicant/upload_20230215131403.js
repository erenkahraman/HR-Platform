import { IncomingForm } from 'formidable';

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    const form = new IncomingForm();
    form.uploadDir = "./";
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log(err, fields, files);
    });
  };