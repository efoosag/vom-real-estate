import {useRef, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { httpUpdateUser, httpDeleteUser, httpSignOutUser } from '../httpRequest'
import { updateUserStart, 
         updateUserSuccess, 
         updateUserFailure,
         deleteUserStart,
         deleteUserSuccess,
         deleteUserFailure,
         signOutUserStart,
         signOutUserSuccess,
         signOutUserFailure, } from '../redux/userSlikce'


export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileRef = useRef()
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileError, setFileError] = useState(false)
  const [updateSuccessInfo, SetUpdateSuccessInfo] = useState(false)
  const [formData, setFormData] = useState({})
  const { error, loading, currentUser } = useSelector(state => state.user)  

  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (f) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setFormData({
              ...formData,
              avatar: downloadURL,
            })
          }
        )
      }
    );    
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }  
  const handleSubmit = async(e) => {
    e.preventDefault()    
    try {
      dispatch(updateUserStart())      
      const res = await httpUpdateUser(currentUser._id, formData)      
      if(res){                
        dispatch(updateUserSuccess(res))
        SetUpdateSuccessInfo(true)      
      }       
      navigate('/profile')     
    } catch (error) {         
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDelete = async() => {
    try {
      dispatch(deleteUserStart())
      const res = await httpDeleteUser(currentUser._id)      
      if(!res.success == 'OK'){
        dispatch(deleteUserFailure(res.data))
        return;
      } 
      dispatch(deleteUserSuccess())  
      
    } catch (error) {
      dispatch(deleteUserFailure())
    }
  }

  const handleSignOut = async() => {
    try {
      dispatch(signOutUserStart())
      const res = await httpSignOutUser()      
      if(!res){
        dispatch(signOutUserFailure(res.data))
        return;
      } 
      dispatch(signOutUserSuccess())  
      
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  return (
    <div className='flex flex-col p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center mt-7'>Profile</h1>
      <form className='flex flex-col gap-3 mt-5'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/.*'/>
        <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover self-center mt-2' src={formData.avatar || currentUser.avatar} alt='profile'/>
        <p className='text-center'>
          {
            fileError ? (<span className='text-red-700'>Image upload failure(Image must be less than 2MB)</span>) :
            filePerc > 0 && filePerc < 100 ? (<span className='text-slate-700'>{`Uploading....${filePerc}%`}</span>) :
            filePerc == 100 ? (<span className='text-green-700'>Image uploaded successfully</span>) :
            ""
          }
        </p>
        <input type='text' placeholder={currentUser.username} className='p-3 border rounded-lg' id='username' onChange={handleChange}/>
        <input type='email' placeholder={currentUser.email} className='p-3 border rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='p-3 border rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-900 text-white p-3 rounded-lg hover:opacity-80' onClick={handleSubmit}>{loading ? 'Loading.....' : 'UPDATE'}</button>
        <Link to='/create-listing' className='bg-green-900 text-center uppercase text-white p-3 rounded-lg hover:opacity-80'>create listing</Link>        
      </form>
      {error && <p className='text-red-600 mt-1'>{error}</p>}
      {updateSuccessInfo && <p className='text-green-600 mt-1'>User have been successfully updated</p>}
      <div className='flex justify-between mt-3'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
