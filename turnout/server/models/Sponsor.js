import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId
export const SponsorSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account', unique: true },
  name: { type: String, required: true, minLength: 3, maxLength: 25 },
  description: { type: String, maxLength: 200 },
  imgUrl: { type: String, maxLength: 200 },
  companyColor: { type: String, maxLength: 7, default: '#1d1d16' }
})

