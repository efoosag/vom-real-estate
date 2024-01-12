import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {type: String, required: true, unique: true,},
  email: {type: String, required: true, unique: true,},
  password: {type: String, required: true,},
  avatar: {type: String, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fempty-profile-picture&psig=AOvVaw2vQ5DwxZMU1t6ERnGFxMps&ust=1705172236529000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCPD9zd3D2IMDFQAAAAAdAAAAABAJ"},
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;