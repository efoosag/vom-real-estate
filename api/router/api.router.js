import express from 'express';
import usersRouter from './user.router.js';
import authRouter from './auth.router.js';
import listingRouter from './listing.router.js';

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/listing', listingRouter);

export default apiRouter