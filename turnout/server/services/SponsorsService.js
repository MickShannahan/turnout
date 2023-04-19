import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";



class SponsorsService {

  async getById(id) {
    const sponsor = await dbContext.Account.findById(id)
    //TODO strip off account details, what's the best way?
    if (!sponsor) throw new BadRequest(`sponsor by id ${id} does not exist`)
    return sponsor
  }

}

export const sponsorsService = new SponsorsService()
