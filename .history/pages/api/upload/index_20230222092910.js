import { IncomingForm } from 'formidable'

var mv = require('mv');

export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            //console.log(fields, files)
            //console.log(files.file.filepath)
            var oldPath = files.file.filepath;
            var folder = files.folder;
            var newPath = `./public/uploads/${folder}/${files.file.originalFilename}`;
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({ fields, files })
        })
    })
    
}