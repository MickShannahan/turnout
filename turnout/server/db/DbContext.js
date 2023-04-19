import mongoose, { mongo } from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ConventionSchema } from '../models/Convention.js';
import { BoothSchema } from '../models/Booth.js';
import { SponsorSchema } from '../models/Sponsor.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Conventions = mongoose.model('Convention', ConventionSchema)

  Sponsors = mongoose.model('Sponsor', SponsorSchema)
  Booths = mongoose.model('Booth', BoothSchema)
}

export const dbContext = new DbContext()
