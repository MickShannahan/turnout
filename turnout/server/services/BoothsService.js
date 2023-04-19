import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";
import { sponsorsService } from "./SponsorsService.js";


class BoothsService {

  async create(boothData, userId) {
    const company = await sponsorsService.getById(boothData.sponsorId)
    if (company.creatorId != userId) throw new Forbidden("you cannot perform this create")
    const booth = await dbContext.Booths.create(boothData)
    return booth
  }
  async remove(boothId, userId) {
    const booth = await dbContext.Booths.findById(boothId)
    const company = await sponsorsService.getById(booth.sponsorId)
    if (company.creatorId != userId) throw new Forbidden("you cannot perform that delete")
    return `${company.name} booth was removed from the register`
  }

  async findBySponsorId(sponsorId) {
    const booths = await dbContext.Booths.find({ sponsorId }).populate('convention')
    return booths
  }

  async findByConventionId(conventionId) {
    const booths = await dbContext.Booths.find({ conventionId }).populate('company')
    return booths
  }


}

export const boothsService = new BoothsService()
