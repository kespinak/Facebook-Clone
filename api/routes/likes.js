import express from "express";
import { getLikes, addLike, deleteLike } from '../controllers/like.js';

const router = express.Router();

router.get('/', getLikes);
router.post('/', addLike);
router.delete('/', deleteLike);



export default router;

//for getLikes endpoint
//1. create like endpoint in api/routes/likes.js
//2. create getLikes function in api/controllers/like.js to query data (aka likes) from database
//3. use axios to fetch the queried data & useQuery and display it on the frontend in client/src/components/Post.jsx
//4. use mutation from react query to create an add/delete/update data function
//5. tie that function to display on frontend using onclick/handle change/handle add/delete/update function
//1:46