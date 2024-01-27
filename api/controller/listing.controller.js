import { createListing } from '../model/listing.model.js'

export const httpCreateListing = async(req, res) => {     
  try {  
    const createdList = await createListing(req.body)
    return res.status(200).json(createdList)
  }catch(err){
    return res.status(500).json(err.message)
  }  
}