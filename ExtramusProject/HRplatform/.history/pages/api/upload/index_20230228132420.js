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
            console.log("type :" + fields.type)
            var type = fields.type === "Curriculum Vitae" ? "CurriculumVitae"
                         : fields.type ===  "Motivation Letter" ? "MotivationLetter"
                         : fields.type === "Arrival Tickets" ? "ArrivalTickets"
                         : fields.type === "Learning Agreement" ? "LearningAgreement"
                         : fields.type === "Acceptance Letter" ? "AcceptanceLetter"
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
            var new_file = `${type}_${files.file.originalFilename}`;
            var newPath = `./public/uploads/students/${fields.student}/${new_file}`;
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({success:"The "+ type + files.file.originalFilename + "has uploaded successfully!"})
        })
    })
    

   
    
    
}