import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const MONGODB = process.env.MONGODB;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

export async function mongoConnect() {
  await mongoose.connect(MONGODB);  
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}

