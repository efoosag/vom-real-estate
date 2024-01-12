import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/v1/"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const authWithGoogle = async (user) => {
  const res = await publicRequest.post("auth/google", user)  
  return res.data   
}

export const httpSignUp = async (user) => {
  const res = await publicRequest.post("/auth/signup", user)  
  return res.data   
}

export const httpSignIn = async (user) => {
  const res = await publicRequest.post("/auth/signin", user)  
  return res.data   
}