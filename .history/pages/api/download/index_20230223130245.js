import { IncomingForm } from 'formidable';
var mv = require('mv');
import fs from 'fs';
import useDownloader from "react-use-downloader";

export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    //const {file, folder} = req.body;
    const {download} = useDownloader();

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
     
                //listing all files using forEach
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    var splitFile = file.split("_");
      
                    if(splitFile[0] === fields.type.replace(" ","")){
                        var filename = directoryPath + "/" +splitFile[0];
                        console.log(filename)
                        download(filename, splitFile[0])
                    } 
                   
                });
                //res.status(200).json({files})
            });
            console.log("test :" +test)
            res.status(200).json(test)
           // var newPath = `./public/uploads/students/${fields.student}/${fields.student}_${title}`;
           
           
           
            
        })
    })
    
}