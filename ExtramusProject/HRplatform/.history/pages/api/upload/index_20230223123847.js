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
    
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req,  (err, fields, files) => {
            if (err) return reject(err)
            
            //console.log(files.file.filepath)
            var oldPath = files.file.filepath;
            var folder = fields.folder === "Curriculum Vitae" ? "CurriculumVitae"
                         : fields.folder ===  "Motivation Letter" ? "MotivationLetter"
                         : fields.folder === "Arrival Tickets" ? "ArrivalTickets"
                         : fields.folder === "Learning Agreement" ? "LearningAgreement"
                         : fields.folder === "Acceptance Letter" ? "AcceptanceLetter"
                         : "";
            var new_pa = `./public/uploads/students/${fields.student}`;
            fs.mkdir(new_pa,{recursive: true}, (err) => {
                if (err) {
                    console.log("error occurred in creating new directory", err);
                    return;
                }
                console.log("New directory created successfully");
              })
              console.log(files.file.originalFilename)
            var new_file = `${folder}_${files.file.originalFilename}`;
            var newPath = `./public/uploads/students/${fields.student}/${new_file}`;
            /*
            student = fields.student;
            path = newPath;
            title = fields.title;
            file = new_file;
            
            async () => {
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
                    console.log("CONSOLE : ", document)
                    //res.status(200).json(document);
                } catch (err) {
                    res.status(500).json(err);
                }
            }*/
            
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({ fields, files })
        })
    })
    

   
    
    
}