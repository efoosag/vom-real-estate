import express from 'express';
import { httpSignUp, httpSignIn } from '../controller/auth.controller.js'

const authRouter = express.Router();

authRouter.post('/signup', httpSignUp);
authRouter.post('/signin', httpSignIn);

export default authRouter;