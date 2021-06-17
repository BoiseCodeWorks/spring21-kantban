import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Listing = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bid: { type: Number, required: true, min: 1 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    highestBidderId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Listing.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

Listing.virtual('highestBidder', {
  localField: 'highestBidderId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
