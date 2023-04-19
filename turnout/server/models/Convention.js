import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const ConventionSchema = new Schema(
  {
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minLength: 5, maxLength: 25 },
    type: { type: String, required: true, minLength: 5, maxLength: 15 },
    description: { type: String, maxLength: 500 },
    imgUrl: { type: String, required: true, maxLength: 200 },
    date: { type: String, required: true },
    days: { type: Number, required: true, default: 1 },
    boothSpots: { type: Number, required: true, min: 1, max: 100 }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

ConventionSchema.virtual('boothCount', {
  localField: '_id',
  foreignField: 'conventionId',
  ref: 'Booth',
  count: true
})
