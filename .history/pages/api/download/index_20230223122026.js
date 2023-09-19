import { IncomingForm } from 'formidable';
var mv = require('mv');
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
           //requiring path and fs modules
            
            //const fs = require('fs');
            //joining path of directory 
            var test = 0;
            const directoryPath = `./public/uploads/students/${fields.student}`
            //passsing directoryPath and callback function
            fs.readdir(directoryPath, function (err, files) {
                //handling error
                if (err) {
                    res.status(200).json({error:'error'})
                } 
                test = files.length
                console.log(test)
                //listing all files using forEach
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    console.log(file); 
                    
                });
                //res.status(200).json({files})
            });
            console.log(test)
            res.status(200).json(test)
           // var newPath = `./public/uploads/students/${fields.student}/${fields.student}_${title}`;
           
           
           
            
        })
    })
    
}