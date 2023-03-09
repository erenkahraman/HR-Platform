const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req);
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });


export default function handler(req, res) {
  upload.single('file')(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error uploading file' });
    }
    
    return res.status(200).json({ message: 'File uploaded successfully' });
  });
}
export const config = {
  api: {
    bodyParser: false
  }
};