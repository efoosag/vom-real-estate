import express from "express";
import { verifyToken, verifyTokenAndAuthorization } from '../services/verifyToken.js';
import { httpCreateListing } from '../controller/listing.controller.js'

const listingRouter = express.Router();

listingRouter.post('/create', verifyToken, httpCreateListing)

export default listingRouter;