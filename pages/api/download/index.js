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
            if (err) {
                console.error("FormData işleme hatasi:", err);
                return res.status(500).json({ error: "FormData işleme hatasi" });
            }
            const studentName = fields.intern;
            const fileType = fields.type;
            console.log(studentName,fileType);
            const directoryPath = `./public/uploads`;
            //passsing directoryPath and callback function
            fs.readdir(directoryPath, function (err, files) {
                //handling error
                if (err) {
                    return res.status(200).json({error:'error'})
                }
                //listing all files using forEach
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    var splitFile = file.split(" ");
                    console.log(splitFile[0],splitFile[1]);
                    if(splitFile[0] === fields.intern && splitFile[1] === fields.type){
                        console.log("geldim");
                        var URLFile = directoryPath + "/" + file;
                        return res.status(200).json({URLFile,file})
                    } 
                });
                return  res.status(200).json({error:"KO"})
            });
        })
    })
    
}