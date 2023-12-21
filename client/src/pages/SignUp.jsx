import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { httpSignUp } from '../httpRequest'

export default function SignUp() {
  const navigate = useNavigate()
  const [formInput, setFormInput] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await httpSignUp(formInput)      
      if(res){                
        setLoading(false) 
        setError(false)        
      } 
      setLoading(false) 
      setError(false) 
      navigate('/sign_in')     
    } catch (error) {      
      setLoading(false)
      console.log(error)
      setError(error.response.data)
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center my-10 text-3xl font-semibold'>Sign Up</h1>
      <form className='flex flex-col gap-3'>
        <input type='text' placeholder='username' required className='p-3 border rounded-lg' id='username' onChange={handleChange}/>
        <input type='email' placeholder='email' required className='p-3 border rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' required className='p-3 border rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-900 text-white p-3 rounded-lg hover:opacity-80' onClick={handleSubmit}>{loading ? 'Loading...' : 'Sign in'}</button>
      </form>
      <div className='flex gap-2 my-5'>
        <p>Already have an account?</p>
        <Link to={'/sign_in'}><span className='text-blue-800'>Sign up</span></Link>
      </div>
      {error && <p className='text-red-600 mt-1'>{error}</p>}
    </div>
  )
}
