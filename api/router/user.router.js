import express from 'express';
import { verifyTokenAndAuthorization } from '../services/verifyToken.js';
import { test } from '../controller/user.controller.js';
import { httpUpdateUser, httpDeleteUser } from '../controller/user.controller.js';

const usersRouter = express.Router();

usersRouter.get('/test', test)
usersRouter.post('/:id', verifyTokenAndAuthorization, httpUpdateUser)
usersRouter.delete('/:id', verifyTokenAndAuthorization, httpDeleteUser)


export default usersRouter;