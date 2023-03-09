import multer from 'multer';

const upload = multer({
  dest: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.originalfilename)
  }
});


export default function handler(req, res) {
  upload.single('video')(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error uploading file' });
    }
    console.log(req.file);
    return res.status(200).json({ message: 'File uploaded successfully' });
  });
}
export const config = {
  api: {
    bodyParser: false
  }
};