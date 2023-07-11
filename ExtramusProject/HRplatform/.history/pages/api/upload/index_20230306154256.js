import { IncomingForm } from 'formidable';
import fs from 'fs';
var mv = require('mv');
import cloudinary from 'cloudinary';


cloudinary.config({
  cloud_name: 'CLOUDINARY-USER-NAME',
  api_key: 'CLOUDINARY-API-KEY',
  api_secret: 'CLOUDINARY-API-SECRET',
});
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
                var type = fields.type === "Intern Development Plan" ? "Intern_Development"
                : fields.type ===  "learning Agreement After" ? "learning_Agreement_After"
                : fields.type === "Accommodation Letter" ? "Accommodation_Letter"
                : fields.type === "Confidentiality Agrement" ? "Confidentiality_Agrement"
                : fields.type === "Interview Record" ? "Interview_Record"
                : "";

                if(fields.type === "Interview Record"){
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
                
            }
            if(fields.type === "Interview Record"){
                var new_file = `${type}_${files.file.originalFilename}`;
                var newPath = `./public/uploads/${fields.typeStudent}/${fields.student}/${new_file}`;
                mv(oldPath, newPath, function(err) {
                });
                res.status(200).json({success: "OK"})
            }
        })
        
    })
    
    
    const file = data?.files?.inputFile.path;

    const response = await cloudinary.v2.uploader.upload(file, {
        resource_type: 'video',
        public_id: 'my_video',
    });
    return res.status(200).json(response);
    
   
    
}