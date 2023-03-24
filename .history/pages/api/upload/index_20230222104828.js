import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    const {file, folder} = req.body;
    console.log("folder : ", folder)
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            console.log(req.body)
            //console.log(files.file.filepath)
            var oldPath = files.file.filepath;
            var newPath = `./public/uploads/${files.file.originalFilename}_${folder}`;
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({ fields, files })
        })
    })
    
}