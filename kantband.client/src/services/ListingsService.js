import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListingsService {
  async getListings() {
    const res = await api.get('api/listings')
    AppState.listings = res.data
  }

  async placeBid(listing, bid) {
    const res = await api.post(`api/listings/${listing.id}/bid`, bid)
    console.log(res.data)
  }
}

export const listingsService = new ListingsService()
