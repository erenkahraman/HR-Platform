import { IncomingForm } from 'formidable';
import { getMongoDb } from "../../../util/mongodb";
import Document from "../../../models/document";
import dbConnect from "../../../util/mongodb";
var mv = require('mv');
import fs from 'fs';


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    //const {file, folder} = req.body;
    const db = await getMongoDb();
    await dbConnect();
    
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
            var new_pa = `./public/uploads/students/${fields.student}`;
            fs.mkdir(new_pa,{recursive: true}, (err) => {
                if (err) {
                    console.log("error occurred in creating new directory", err);
                    return;
                }
                console.log("New directory created successfully");
              })
            var newPath = `./public/uploads/students/${fields.student}/${fields.student}_${title}`;
            
            
           
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({ fields, files })
        })
    })
    
}