import express from "express";
// import { getUser } from '../controllers/user.js';

const router = express.Router()

// router.get('/find/:userId', getUser)
router.get('/test', (request, response) => {
  response.send('it works!')
});


export default router;