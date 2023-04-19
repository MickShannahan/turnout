import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";



class ConventionsService {
  async getAll(query = {}) {
    const today = new Date()
    const conventions = await dbContext.Conventions.find({ date: { $gte: today } }).sort({ date: 1 }).populate('boothCount')
    return conventions
  }
  async getOneById(id) {
    const con = await dbContext.Conventions.findById(id).populate('boothCount')
    if (!con) throw new BadRequest(`No event at id ${id}`)
    return con
  }
  async create(conData) {
    const con = await dbContext.Conventions.create(conData)
    return con
  }
  async update(conUpdate) {
    const originalCon = await this.getOneById(conUpdate.id)
    originalCon.name = conUpdate.name != null ? conUpdate.name : originalCon.name
    originalCon.tags = conUpdate.tags != null ? conUpdate.tags : originalCon.tags
    originalCon.description = conUpdate.description != null ? conUpdate.description : originalCon.description
    originalCon.imgUrl = conUpdate.imgUrl != null ? conUpdate.imgUrl : originalCon.imgUrl
    originalCon.date = conUpdate.date != null ? conUpdate.date : originalCon.date
    originalCon.days = conUpdate.days != null ? conUpdate.days : originalCon.days
    originalCon.boothSpots = conUpdate.boothSpots != null ? conUpdate.boothSpots : originalCon.boothSpots
    await originalCon.save()
    return originalCon
  }
  async remove(conventionId, userId) {
    const originalCon = await this.getOneById(conventionId)
    if (originalCon.creatorId != userId) throw new Forbidden('Not allowed to do this')
    await originalCon.remove()
    return `${originalCon.name} was removed from the schedule`
  }

}

export const conventionsService = new ConventionsService()
