import path from 'path';
import express from "express";
import { mongoConnect } from "./services/mongo.js"; 
import morgan from "morgan";
import apiRouter from "./router/api.router.js";
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}))


app.use(morgan('combined'));

app.listen(3000, () => { 
  console.log("Server is running on port 3000")
})

app.use(express.json());

app.use('/api/v1/', apiRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({success: false, statusCode, message})
})

await mongoConnect();


