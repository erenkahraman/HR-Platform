import { IncomingForm } from 'formidable';
var mv = require('mv');
import fs from 'fs';
//import {useDownloader} from "react-use-downloader";

export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    //const {file, folder} = req.body;
    //const {download} = useDownloader();

    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            
            //console.log(files.file.filepath)
           //requiring path and fs modules
            
            //const fs = require('fs');
            //joining path of directory 
           
            const directoryPath = `./public/uploads/students/${fields.student}`;
            
            //passsing directoryPath and callback function
            fs.readdir(directoryPath, function (err, files) {
                //handling error
                if (err) {
                    res.status(200).json({error:'error'})
                }
     
                //listing all files using forEach
               
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    var splitFile = file.split("_");
                    var uploaded = fields.upload;
                    if(splitFile[0] === fields.type.replace(" ","")){
                        var URLFile = directoryPath + "/" +file;
                    
                        //download(filename, splitFile[0])
                       res.status(200).json({URLFile,file,uploaded})
                    } else
                        res.status(200).json({d:"OK"})
                });
                //res.status(200).json({files})
            });
        
        })
    })
    
}