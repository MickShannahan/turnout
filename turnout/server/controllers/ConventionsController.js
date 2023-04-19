import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { conventionsService } from "../services/ConventionsService.js";
import { boothsService } from "../services/BoothsService.js";



export class ConventionsController extends BaseController {
  constructor() {
    super('api/conventions')
    this.router
      .get('', this.getAll)
      .get('/:conventionId', this.getOneById)
      .get('/:conventionId/booths', this.getConventionBooths)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:conventionId', this.update)
      .delete('/:conventionId', this.remove)
  }
  async getConventionBooths(req, res, next) {
    try {
      const booths = await boothsService.findByConventionId(req.params.conventionId)
      return res.send(booths)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      const cons = await conventionsService.getAll(req.query)
      return res.send(cons)
    } catch (error) {
      next(error)
    }
  }
  async getOneById(req, res, next) {
    try {
      const con = await conventionsService.getOneById(req.params.conventionId)
      return res.send(con)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const con = await conventionsService.create(req.body)
      return res.send(con)
    } catch (error) {
      next(error)
    }
  }
  async update(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.conventionId
      const con = await conventionsService.update(req.body)
      return res.send(con)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const message = await conventionsService.remove(req.params.conventionId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
