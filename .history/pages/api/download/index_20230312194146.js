import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            //console.log("typeS : " +"./public/uploads/"+fields.typeStudent+"/"+fields.student)
            const directoryPath = `./public/uploads`;
            
            //passsing directoryPath and callback function
            fs.readdir(directoryPath, function (err, files) {
                //handling error
                if (err) {
                    res.status(200).json({error:'error'})
                }
                
                //listing all files using forEach
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    var splitFile = file.split(" ");
                    //res.status(200).json({splitFile})
                    //console.log(splitFile[1], " & ",fields.type)
                    if(splitFile[0] === fields.student && splitFile[1] === fields.type){
                        var URLFile = directoryPath + "/" +file;
                        res.status(200).json({URLFile,file})
                    } 
                });
                res.status(200).json({error:"KO"})
            });
        
        })
    })
    
}