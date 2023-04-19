import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";
import { sponsorsService } from "./SponsorsService.js";


class BoothsService {

  async create(boothData, userId) {
    const booth = await dbContext.Booths.create(boothData)
    await booth.populate('sponsor', 'sponsorName sponsorColor sponsorImgUrl')
    return booth
  }
  async remove(boothId, userId) {
    const booth = await dbContext.Booths.findById(boothId)
    if (booth.sponsorId != userId) throw new Forbidden("you cannot perform that delete")
    return `${booth.name} booth was removed from the register`
  }

  async findBySponsorId(sponsorId) {
    const booths = await dbContext.Booths.find({ sponsorId }).populate('convention')
    return booths
  }

  async findByConventionId(conventionId) {
    const booths = await dbContext.Booths.find({ conventionId }).populate('sponsor', 'sponsorName sponsorImgUrl sponsorColor')
    return booths
  }


}

export const boothsService = new BoothsService()
