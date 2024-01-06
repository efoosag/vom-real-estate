import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/userSlikce'
import { httpSignIn } from '../httpRequest'

export default function SignIn() {
  const navigate = useNavigate()
  const [formInput, setFormInput] = useState({})  
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.user)

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    dispatch(signInStart())    
    try {
      const res = await httpSignIn(formInput)      
      dispatch(signInSuccess(res))      
      navigate('/')     
    } catch (error) {   
      dispatch(signInSuccess(error.response.data))      
    }    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center my-10 text-3xl font-semibold'>Sign In</h1>
      <form className='flex flex-col gap-3'>
        <input type='email' placeholder='email' required className='p-3 border rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' required className='p-3 border rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-900 text-white p-3 rounded-lg hover:opacity-80' onClick={handleSubmit}>{loading ? 'Loading...' : 'Sign in'}</button>
      </form>
      <div className='flex gap-2 my-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign_up'}><span className='text-blue-800'>Sign up</span></Link>
      </div>
      {error && <p className='text-red-600 mt-1'>{error}</p>}
    </div>
  )
}
