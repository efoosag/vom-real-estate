import path from 'path';
import express from "express";
import { mongoConnect } from "./services/mongo.js"; 
import morgan from "morgan";
import apiRouter from "./router/api.router.js";


const app = express();

app.use(morgan('combined'));

app.listen(3000, () => { 
  console.log("Server is running on port 3000")
})

app.use(express.json());

app.use('/api/v1/', apiRouter);

await mongoConnect();


