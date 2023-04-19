import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class SponsorsService {

  async getSponsorById(sponsorId) {
    const res = await api.get(`api/sponsors/${sponsorId}`)
    logger.log('[GOT SPONSOR]', res.data)
    AppState.activeSponsor = res.data
  }

  async getSponsorBooths(sponsorId) {
    const res = await api.get(`api/sponsors/${sponsorId}/booths`)
    logger.log('[GOT SPONSOR BOOTHS]', res.data)
    AppState.sponsorBooths = res.data
  }

}

export const sponsorsService = new SponsorsService()
