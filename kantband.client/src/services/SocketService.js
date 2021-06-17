import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('bid', this.updateListing)
      .on('hi', this.hiEvent)
      .on('error', (e) => {
        Notification.toast(e.message, 'error')
      })
  }

  updateListing(listing) {
    const i = AppState.listings.findIndex(l => l.id === listing.id)
    AppState.listings.splice(i, 1, listing)
  }

  hiEvent(payload) {
    logger.log(payload)
    Notification.toast('the server said hi back')
  }
}

export const socketService = new SocketService()
