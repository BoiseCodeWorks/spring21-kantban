import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listingsService } from '../services/ListingsService'

export class ListingsController extends BaseController {
  constructor() {
    super('api/listings')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .post('/:id/bid', this.bid)
  }

  async getAll(req, res, next) {
    try {
      const listings = await listingsService.getAll(req.query)
      return res.send(listings)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const listing = await listingsService.create(req.body)
      res.send(listing)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const listing = await listingsService.update(req.body, req.userInfo.id)
      res.send(listing)
    } catch (error) {
      next(error)
    }
  }

  async bid(req, res, next) {
    try {
      const listing = await listingsService.bid(req.params.id, req.userInfo.id, req.body.bid)
      res.send(listing)
    } catch (error) {
      next(error)
    }
  }
}
