import express from 'express';
import { verifyTokenAndAuthorization } from '../services/verifyToken.js';
import { test } from '../controller/user.controller.js';
import { httpUpdateUser } from '../controller/user.controller.js';

const usersRouter = express.Router();

usersRouter.get('/test', test)
usersRouter.post('/:id', verifyTokenAndAuthorization, httpUpdateUser)

export default usersRouter;