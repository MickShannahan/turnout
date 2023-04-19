import { boothsService } from "../services/BoothsService.js";
import { sponsorsService } from "../services/SponsorsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider'


export class SponsorsController extends BaseController {
  constructor() {
    super('api/companies')
    this.router
      .get('', this.getAll)
      .get('/:sponsorId', this.getById)
      .get('/:sponsorId', this.getBoothsForCompany)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:sponsorId', this.update)
      .delete('/:sponsorId', this.remove)
  }
  async getBoothsForCompany(req, res, next) {
    try {
      const booths = await boothsService.findBySponsorId(req.params.sponsorId)
      return res.send(booths)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      const companies = await sponsorsService.getAll(req.query)
      return res.send(companies)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const company = await sponsorsService.getById(req.params.id)
      return res.send(company)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const company = await sponsorsService.create(req.body)
      return res.send(company)
    } catch (error) {
      next(error)
    }
  }
  async update(req, res, next) {
    try {
      req.body.id = req.params.sponsorId
      req.body.creatorId = req.userInfo.id
      const company = await sponsorsService.update(req.body)
      return res.send(company)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const message = await sponsorsService.remove(req.params.sponsorId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
