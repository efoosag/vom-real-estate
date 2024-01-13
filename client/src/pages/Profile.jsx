import {useRef, useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const navigate = useNavigate()
  const fileRef = useRef()
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileError, setFileError] = useState(false)
  const [formData, setFormData] = useState({})
  const { currentUser } = useSelector(state => state.user)
  const [formInput, setFormInput] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

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
    setFormInput({
      ...formInput,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async(e) => {
    e.preventdefault()
    setLoading(true)
    try {
      const res = await httpUpdateUser(formInput)      
      if(res){                
        setLoading(false) 
        setError(false)        
      } 
      setLoading(false) 
      setError(false) 
      navigate('/profile')     
    } catch (error) {      
      setLoading(false)
      console.log(error)
      setError(error.response.data)
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
        <input type='text' placeholder='username' required className='p-3 border rounded-lg' id='username' onChange={handleChange}/>
        <input type='email' placeholder='email' required className='p-3 border rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' required className='p-3 border rounded-lg' id='password' onChange={handleChange}/>
        <button className='bg-slate-900 text-white p-3 rounded-lg hover:opacity-80' onClick={handleSubmit}>UPDATE</button>        
      </form>
      <div className='flex justify-between mt-3'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
