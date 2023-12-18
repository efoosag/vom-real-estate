import express from 'express';
import { httpSignUp } from '../controller/auth.controller.js'

const authRouter = express.Router();

authRouter.post('/signup', httpSignUp);

export default authRouter;