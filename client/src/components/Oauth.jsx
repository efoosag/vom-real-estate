import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { authWithGoogle } from '../httpRequest'
import { signInSuccess } from '../redux/userSlikce'
import { useDispatch } from 'react-redux'

export default function Oauth() {
  const dispatch = useDispatch()
  const handleGoogleClick = async() => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const res = await authWithGoogle({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      })      
      dispatch(signInSuccess(res))
    } catch (error) {
      console.log('Could not authenticate with google', error)
    }
  }
  return (    
      <button onClick={handleGoogleClick} type='button' className='bg-red-800 text-white p-3 rounded-lg hover:opacity-95 uppercase'>continue with google</button>
  )
}
