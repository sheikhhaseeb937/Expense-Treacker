

import express from 'express';
import {  getUserInfo, loginUser, registerUser } from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';



const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getUser",protect, getUserInfo)




export default router;