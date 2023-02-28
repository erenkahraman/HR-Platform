import { IncomingForm } from 'formidable';
import {mv} from 'mv';
import fs from 'fs';


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    //const {file, folder} = req.body;
    
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            
            //console.log(files.file.filepath)
            var oldPath = files.file.filepath;
            var folder = fields.folder === "Curriculum Vitae" ? "Curriculum_Vitae"
                         : fields.folder ===  "Motivation Letter" ? "Motivation_Letter"
                         : fields.folder === "Arrival Tickets" ? "Arrival_Tickets"
                         : fields.folder === "Learning Agreement" ? "Learning_Agreement"
                         : fields.folder === "Acceptance Letter" ? "Acceptance_Letter"
                         : "";
            fs.mkdir(`./public/uploads/students/${fields.student}`), (err) => {
                if (err) console.log("error occurred in creating new directory", err);
              }
            var newPath = `./public/uploads/students/${fields.student}/${folder}_${files.file.originalFilename}`;
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({ fields, files })
        })
    })
    
}