import nextConnect from 'next-connect';
import multer from 'multer';


const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, __dirname+'/uploads');
    },
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

try{
  apiRoute.use(upload.single('theFile'));
  apiRoute.post((req, res) => {
    res.status(200).json({ data: __dirname+'/uploads' });
  });
} catch {
  apiRoute.post((req, res) => {
    res.status(501).json({ data: 'error' });
  });
}


export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};