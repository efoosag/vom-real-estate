import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-lg'>
      <div className='flex justify-between items-center mx-auto p-3  max-w-6xl bg-slate-200'>
        <h1 className='font-bold flex flex-wrap items-center'>
          <Link to='/'>
            <span className='text-slate-500 text-lg sm:text-xl'>VOM</span>
            <span className='text-slate-700 text-sm sm:text-lg'>RealEstate</span>
          </Link>          
        </h1>
        <form className='bg-slate-50 p-3 rounded-lg flex items-center'>
          <input type='text' placeholder='Search....' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
          <FaSearch className='text-slate-600 text-lg'/>
        </form>
        <ul className='flex gap-3'>
          <li className='hidden sm:inline text-slate-700 hover:text-purple-600'><Link to='/'>Home</Link></li>
          <li className='hidden sm:inline text-slate-700 hover:text-purple-600'><Link to='/about'>About</Link></li>
          <li className='sm:inline text-slate-700 hover:text-purple-600'><Link to='/sign_in'>Sign In</Link></li>
        </ul>        
      </div>
    </header>
  )
}
