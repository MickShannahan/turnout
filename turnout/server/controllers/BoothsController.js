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
      const booth = await boothsService.create(req.body, req.userInfoId)
      return res.send(booth)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    const message = await boothsService.remove(req.params.boothId, req.userInfo.id)
    return res.send(message)
  }


}
