import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center my-10 text-3xl font-semibold'>Sign Up</h1>
      <form className='flex flex-col gap-3'>
        <input type='text' placeholder='username' className='p-3 border rounded-lg' id='username'/>
        <input type='email' placeholder='email' className='p-3 border rounded-lg' id='email'/>
        <input type='password' placeholder='password' className='p-3 border rounded-lg' id='password'/>
        <button className='bg-slate-900 text-white p-3 rounded-lg hover:opacity-80'>Sign up</button>
      </form>
      <div className='flex gap-2 my-5'>
        <p>Already have an account?</p>
        <Link to={'/sign_in'}><span className='text-blue-800'>Sign in</span></Link>
      </div>
    </div>
  )
}
