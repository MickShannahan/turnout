import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const BoothSchema = new Schema(
  {
    sponsorId: { type: ObjectId, required: true, ref: 'Account' },
    conventionId: { type: ObjectId, required: true, ref: 'Convention' },
    boothSize: { type: String, required: true, enum: ['small', 'regulari', 'large'], default: 'small' },
    keynote: { type: Boolean, required: true, default: false },
    appointmentRequired: { type: Boolean, required: true, default: false },
    productsForSale: { type: Boolean, required: true, default: false }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

BoothSchema.virtual('sponsor', {
  localField: 'companyId',
  foreignField: '_id',
  ref: 'Company',
  justOne: true
})

BoothSchema.virtual('Convention', {
  localField: 'conventionId',
  foreignField: '_id',
  ref: 'Convention',
  justOne: true
})
