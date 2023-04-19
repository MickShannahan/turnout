import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class ConventionsService {

  async getConventions() {
    const res = await api.get('api/conventions')
    logger.log('[Get Conventions]', res.data)
    AppState.conventions = res.data
  }

  async getConventionById(conventionId) {
    const res = await api.get(`api/conventions/${conventionId}`)
    logger.log('[GOT CONVENTION]', res.data)
    AppState.activeConvention = res.data
  }

  async getConventionBooths(conventionId) {
    const res = await api.get(`api/conventions/${conventionId}/booths`)
    logger.log('[GET CONVENTION BOOTHS]', res.data)
    AppState.conventionBooths = res.data
  }

  async createConvention(conData) {
    const res = await api.post('api/conventions', conData)
    logger.log("[POST CONVENTION]")
    AppState.activeConvention = res.data
    return res.data
  }

  async deleteConvention(conventionId) {
    const res = await api.delete(`api/conventions/${conventionId}`)
    logger.log('deleted convention', res.data)
  }

}

export const conventionsService = new ConventionsService()
