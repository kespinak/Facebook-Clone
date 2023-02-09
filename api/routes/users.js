import express from "express";
import { getUser, updateUser } from '../controllers/user.js';

const router = express.Router();

// for testing example:
// http://localhost:8800/api/users/test
// router.get('/test', (request, response) => {
//   response.send('it works!')
// });
router.get('/find/:userId', getUser);
router.put('/', updateUser);


export default router;