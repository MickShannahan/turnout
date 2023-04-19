import { boothsService } from "../services/BoothsService.js";
import { sponsorsService } from "../services/SponsorsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider'


export class SponsorsController extends BaseController {
  constructor() {
    super('api/sponsors')
    this.router
      .get('/:sponsorId', this.getById)
      .get('/:sponsorId/booths', this.getBoothsForSponsor)
  }

  async getById(req, res, next) {
    try {
      const company = await sponsorsService.getById(req.params.sponsorId)
      return res.send(company)
    } catch (error) {
      next(error)
    }
  }
  async getBoothsForSponsor(req, res, next) {
    try {
      const booths = await boothsService.findBySponsorId(req.params.sponsorId)
      return res.send(booths)
    } catch (error) {
      next(error)
    }
  }


}
