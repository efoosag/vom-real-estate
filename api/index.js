import express from "express";
import { mongoConnect } from "./services/mongo.js"; 
import morgan from "morgan";

const app = express();

app.use(morgan('combined'));

app.listen(3000, () => { 
  console.log("Server is running on port 3000")
})

await mongoConnect();
