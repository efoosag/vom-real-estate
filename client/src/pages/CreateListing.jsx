import React, { useState, useEffect } from 'react'
import {getStates, getLgas, getWards } from '../uitility/states_lga_wards';

export default function CreateListing() {
  const [nState, setState] = useState(null)
  const [nSelectedLga, setSelectedLga] = useState(null)
  const [nLgas, setLgas] = useState([])
  const [nWards, setWards] = useState([])
  const [formData, setFormData] = useState({}) 
  const nigeriaStates = getStates();   
   
  useEffect(() => {    
    setLgas(getLgas(nState))   
  },[nState])

  useEffect(() => {    
    setWards(getWards(nState, nSelectedLga))   
  },[nState, nSelectedLga])

  const handleChange = (e) => {
    if(e.target.id == 'lga'){setSelectedLga(e.target.value)}
    if(e.target.id == 'state'){setState(e.target.value)}
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  } 
  return (
    <main className='p-3 mx-auto max-w-4xl'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className="flex flex-col gap-4 flex-1">
          <input type='text' placeholder='Name' id='name' required className='border rounded-lg p-3'/>
          <textarea type='text' placeholder='Description' id='description' required className='border rounded-lg p-3'/>
          <input type='text' placeholder='Address (No 7 washing street)' id='address' required className='border rounded-lg p-3'/>
          <select id='state' onChange={handleChange} className='p-3 rounded-lg'>
            <option value={null}>State</option>
            {nigeriaStates?.map((nstate, i) => 
              <option key={i} value={nstate}>{nstate}</option>
              )}
          </select>
          <select onChange={handleChange} className='p-3 rounded-lg' id='lga'>
            <option value={null}>Local Government Area</option>
            {nLgas && nLgas.map((nLga, i) => 
              <option key={i} value={nLga}>{nLga}</option>
              )}
          </select>
          <select onChange={handleChange} className='p-3 rounded-lg' id='ward'>
            <option value={null}>Ward</option>
            {nWards && nWards.map((nLga, i) => 
              <option key={i} value={nLga}>{nLga}</option>
              )}
          </select>          
          <div className='flex gap-6'>
            <div className='gap-2'>
              <input type='checkbox' id='type' className='w-5'/>
              <span>Rent</span>
            </div>
            <div className='gap-2'>
              <input type='checkbox' id='type' className='w-5'/>
              <span>Sell</span>
            </div>
            <div className='gap-2'>
              <input type='checkbox' id='offer' className='w-5'/>
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-3'>
              <input type='number' id='bedrooms' min={1} max={10} required className='p-3 border-gray-400 rounded-lg'/>
              <span>Bedrooms</span>
            </div>
            <div className='flex items-center gap-3'>
              <input type='number' id='bathrooms' min={1} max={10} required className='p-3 border-gray-400 rounded-lg'/>
              <span>Bathrooms</span>
            </div>
            <div className='flex items-center gap-3'>
              <input type='number' id='price' min={1} max={10} required className='p-3 border-gray-400 rounded-lg'/>
              <div className='flex flex-col text-center'>
                <span>Price</span>
                <span className='text-xs'>(#/year)</span>
              </div>              
            </div>
            <div className='flex items-center gap-3'>
              <input type='number' id='discountedprice' min={1} max={10} required className='p-3 border-gray-400 rounded-lg'/>
              <div className='flex flex-col text-center'>
                <span>Discounted Price</span>
                <span className='text-xs'>(#/year)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images (max 6): <span className='font-normal text-gray-600 ml-2'>Insert cover image first</span>
          </p>
          <div className='flex gap-2'>
            <input type='file' id='images' accept='image/*' multiple className='p-3 border border-gray-300 rounded w-full' />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload </button>
          </div>
          <button className='p-3 bg-gray-700 text-white rounded-lg uppercase hover:opacity-95 disable:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  )
}
