import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const BoothSchema = new Schema(
  {
    sponsorId: { type: ObjectId, required: true, ref: 'Account' },
    conventionId: { type: ObjectId, required: true, ref: 'Convention' },
    name: { type: String, required: true, maxLength: 25 },
    description: { type: String, maxLength: 255 },
    imgUrl: { type: String, required: true, default: 'https://www.reviewjournal.com/wp-content/uploads/2018/10/11239552_web1_G2E_100818cb_009.jpg' },
    keynote: { type: Boolean, required: true, default: false },
    appointmentRequired: { type: Boolean, required: true, default: false },
    productsForSale: { type: Boolean, required: true, default: false }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

BoothSchema.virtual('sponsor', {
  localField: 'sponsorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

BoothSchema.virtual('convention', {
  localField: 'conventionId',
  foreignField: '_id',
  ref: 'Convention',
  justOne: true
})
