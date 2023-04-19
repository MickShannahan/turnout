import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class BoothsService {

  async createBooth(boothData) {
    const res = await api.post('api/booths', boothData)
    logger.log('[POST BOOTH]', res.data)
    AppState.activeConvention.boothCount++
    AppState.conventionBooths.push(res.data)
  }

  async deleteBooth(boothId) {
    const res = await api.delete(`api/booths/${boothId}`)
    logger.log('[DELETE BOOTH]', res.data)
    let index = AppState.sponsorBooths.findIndex(b => b.id == boothId)
    AppState.sponsorBooths.splice(index, 1)
  }

}

export const boothsService = new BoothsService()
