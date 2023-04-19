import { boothsService } from "../services/BoothsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider'


export class BoothsController extends BaseController {
  constructor() {
    super('api/booths')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:boothId', this.remove)
  }
  async create(req, res, next) {
    try {
      req.body.sponsorId = req.userInfo.id
      const booth = await boothsService.create(req.body)
      return res.send(booth)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const message = await boothsService.remove(req.params.boothId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }


}
