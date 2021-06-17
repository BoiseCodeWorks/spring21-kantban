import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { socketProvider } from '../SocketProvider'

class ListingsService {
  async getAll(query = {}) {
    return await dbContext.Listings.find(query)
      .populate('creator', 'name picture')
      .populate('highestBidder', 'name picture')
  }

  async create(listingData) {
    const listing = await dbContext.Listings.create(listingData)
    await listing.populate('creator', 'name picture').execPopulate()
    return listing
  }

  async update(listingData, userId) {
    const listing = await dbContext.Listings.findOneAndUpdate({
      _id: listingData.id,
      creatorId: userId
    }, listingData, { new: true })
    await listing.populate('creator', 'name picture').execPopulate()
    return listing
  }

  async bid(listingId, userId, bid) {
    const listing = await dbContext.Listings.findById(listingId)

    if (bid < listing.bid) {
      throw new BadRequest('Nope more $$$ please')
    }

    listing.bid = bid
    listing.highestBidderId = userId
    await listing.save()
    await listing
      .populate('creator', 'name picture')
      .populate('highestBidder', 'name picture')
      .execPopulate()
    // NOTE tells everyone on the page that the listing has been updated
    socketProvider.io.emit('bid', listing)

    socketProvider.messageRoom(listing.id, 'bid', listing)

    return listing
  }
}

export const listingsService = new ListingsService()
