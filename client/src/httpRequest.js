import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:3000/api/v1/"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const authWithGoogle = async (user) => {
  const res = await publicRequest.post("auth/google", user) 
  const {accesstoken} = res.data
  Cookies.set('accesstoken', accesstoken, { expires: 7, secure: true });
  return res.data   
}

export const httpSignUp = async (user) => {
  const res = await publicRequest.post("/auth/signup", user)  
  return res.data   
}

export const httpSignIn = async (user) => {
  const res = await publicRequest.post("/auth/signin", user)  
  const {accesstoken} = res.data
  Cookies.set('accesstoken', accesstoken, { expires: 7, secure: true });   
  return res.data   
}

export const httpUpdateUser = async (id, user) => { 
  const TOKEN = Cookies.get('accesstoken'); 
  const res = await publicRequest.post(`/users/${id}`,
            {headers: {'Content-Type': 'application/json',
               token: `Bearer ${TOKEN}`}}, user) 
  console.log(res.data)    
  return res.data   
}

export const httpDeleteUser = async (id) => {  
  const TOKEN = Cookies.get('accesstoken');  
  const res = await publicRequest.delete(`/users/${id}`,
            {headers: {'Content-Type': 'application/json',
              token: `Bearer ${TOKEN}`}})
  Cookies.remove('accesstoken')       
  return res  
}