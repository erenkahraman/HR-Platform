import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};
import multer from 'multer';

const upload = multer({ dest: './public/uploads/' });

 
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(200).json({ message: 'File uploaded successfully' });
  });
/*
const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
   
    console.log(files.file)
    
    if(fields.typeStudent === "applicants"){
       
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
    
    await saveFile(files.file,newPath);
    return res.status(201).send("");
  });
};

const saveFile = async (file,newPath) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(newPath, data);
  fs.unlinkSync(file.filepath);
  return;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
*/