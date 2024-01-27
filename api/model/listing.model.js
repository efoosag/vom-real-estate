import Listing from './listing.mongo.js'

export async function createListing(listing) {
  const newList = Listing.create(listing)
  return newList
}