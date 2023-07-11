import { IncomingForm } from 'formidable';
import { getMongoDb } from "../../../util/mongodb";
import Document from "../../../models/document";
import dbConnect from "../../../util/mongodb";
import mongoose from 'mongoose';
import fs from 'fs';
var mv = require('mv');

export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    var student, title, path, file = null;

    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, async (err, fields, files) => {
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
            var new_file = `${fields.student}_${fields.title}`;
            var newPath = `./public/uploads/students/${fields.student}/${new_file}`;
            
            student = fields.student;
            path = newPath;
            title = fields.title;
            file = new_file;
            
            const db = await getMongoDb();
            await dbConnect();
            try {
                const documentId = new mongoose.Types.ObjectId();
                const doc = {
                    _id : documentId,
                    student: student,
                    folder: {
                        name: file,
                        path: path,
                        type: title
                    }
                }
                const JSONFile = JSON.stringify(doc)
                const document = await Document.create(JSONFile);
                res.status(200).json(document);
            } catch (err) {
        
                //res.status(500).json(err);
            }

            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({ fields, files })
        })
    })
    
   
    
    
}