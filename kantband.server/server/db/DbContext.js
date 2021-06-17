import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { Listing } from '../models/Listing'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Listings = mongoose.model('Listing', Listing);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
