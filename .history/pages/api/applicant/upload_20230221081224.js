import nextConnect from 'next-connect';
import multer from 'multer';
import middleware from 'middleware/middleware'


/*const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, __dirname+'\\uploads');
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


  apiRoute.use(upload.single('theFile'));
  apiRoute.post((req, res) => {
    res.status(200).json({ data: __dirname+'\\uploads' });
  });*/
  const handler = nextConnect()
  handler.use(middleware)
  
  handler.post(async (req, res) => {
    console.log(req.body)
    console.log(req.files)
  
    //...
  })

 
export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};