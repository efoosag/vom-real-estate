import express from 'express';
import { httpSignUp, httpSignIn, googleAuth } from '../controller/auth.controller.js'

const authRouter = express.Router();

authRouter.post('/signup', httpSignUp);
authRouter.post('/signin', httpSignIn);
authRouter.post('/google', googleAuth);

export default authRouter;