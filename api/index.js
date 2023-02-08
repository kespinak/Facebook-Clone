//! NOTE THAT CORES IS USING LOCALHOST: 3002 NOT 3001...I NEED TO KILL PORT 3000 AND SET IT TO 3000
//! there is a bug where localhost:3000 is just blank...i need to rerun yarn start to get to localhost:3001 and it will work fine...
// client -> yarn start -> 
// api -> yarn start -> http://localhost:8800/api/users/test
//axios error -> chrome console/axiosError/response/data/reference error

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import likeRoutes from './routes/likes.js'
// import relationshipRoutes from './routes/relationships.js'
import express  from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'
import moment from 'moment'


const app = express();

//middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3001'
  })
);
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
// app.use("/api/relationships", relationshipRoutes);


//* in the future, ill create a router for this multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.listen(8800, () => {
  console.log("API working!")
});