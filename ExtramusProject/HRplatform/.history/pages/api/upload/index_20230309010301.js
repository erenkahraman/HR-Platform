/*import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
   
    console.log("type :" + files)
    
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
  const data = fs.readFileSync(file.pathname);
  fs.writeFileSync(newPath, data);
  fs.unlinkSync(file.pathname);
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
};*/

import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post((req, res) => {
  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};