import { IncomingForm } from 'formidable';
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
       //res.status(200).json({success: "OK"})
        form.parse(req,  (err, fields, files) => {
            
            if (err) return reject(err)
           
            console.log(files.file.filepath)
            //res.status(200).json({success: fields})
            
            var oldPath = files.file.filepath;
            console.log("type :" + fields.typeStudent)
            
            if(fields.typeStudent === "applicants"){
                var type = fields.type === "Curriculum Vitae" ? "CurriculumVitae"
                : fields.type ===  "Motivation Letter" ? "MotivationLetter"
                : fields.type === "Arrival Tickets" ? "ArrivalTickets"
                : fields.type === "Learning Agreement" ? "LearningAgreement"
                : fields.type === "Acceptance Letter" ? "AcceptanceLetter"
                : "";
                var new_pa = `./public/uploads/${fields.typeStudent}/${fields.student}`;
                fs.mkdir(new_pa,{recursive: true}, (err) => {
                    if (err) {
                        console.log("error occurred in creating new directory", err);
                        return;
                    }
                    console.log("New directory created successfully");
                })
                    console.log("file : " + files.file.originalFilename)
            } else {
                
                
                var new_pa = `./public/uploads/${fields.typeStudent}/${fields.student}`;
                fs.mkdir(new_pa,{recursive: true}, (err) => {
                    if (err) {
                        console.log("error occurred in creating new directory", err);
                        return;
                    }
                    console.log("New directory created successfully");
                    })
                    console.log(files.file.originalFilename)
            }
           
            var new_file = `${fields.type}_${files.file.originalFilename}`;
            var newPath = `./public/uploads/${fields.typeStudent}/${fields.student}/${new_file}`;
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({success: "OK"})
        })
    })
    

   
    
    
}