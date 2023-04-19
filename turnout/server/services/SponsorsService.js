import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";



class SponsorsService {
  async getAll(query = {}) {
    const companies = await dbContext.Sponsors.find(query)
    return companies
  }
  async getById(id) {
    const company = await dbContext.Sponsors.findById(id)
    if (!company) throw new BadRequest(`Company by id ${id} does not exist`)
    return company
  }
  async create(companyData) {
    const company = await dbContext.Sponsors.create(companyData)
    return company
  }
  async update(companyUpdate) {
    const originalCompany = await this.getById(companyUpdate.id)
    if (originalCompany.creatorId != companyUpdate.creatorId) throw new Forbidden(" you are not allowed to do this")
    originalCompany.name = companyUpdate.name != null ? companyUpdate.name : originalCompany.name
    originalCompany.description = companyUpdate.description != null ? companyUpdate.description : originalCompany.description
    originalCompany.imgUrl = companyUpdate.imgUrl != null ? companyUpdate.imgUrl : originalCompany.imgUrl
    originalCompany.companyColor = companyUpdate.companyColor != null ? companyUpdate.companyColor : originalCompany.companyColor
    await originalCompany.save()
    return originalCompany
  }
  async remove(companyId, userId) {
    const originalCompany = await this.getById(companyId)
    if (originalCompany.creatorId != userId) throw new Forbidden(`you can't do that`)
    await originalCompany.remove()
    return `${originalCompany.name} has been deleted`
  }

}

export const sponsorsService = new SponsorsService()
