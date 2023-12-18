import express from 'express';
import { test } from '../controller/user.controller.js';

const usersRouter = express.Router();

usersRouter.get('/test', test)

export default usersRouter;