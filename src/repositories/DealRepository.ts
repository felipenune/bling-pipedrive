import { getMongoRepository, MongoRepository } from "typeorm";
import { IDeal } from "../dtos/IDeal";
import IDealRepository from "../dtos/IDealRepository";
import { Deal } from "../schemas/Deal";

export default class DealRepository implements IDealRepository {
  private ormRepository: MongoRepository<Deal>;

  constructor() {
    this.ormRepository = getMongoRepository(Deal, "default")
  }

  public async create({
    deal_id,
    title,
    value,
    org_name,
    cc_email,
  }: IDeal): Promise<Deal> {
    const deal = this.ormRepository.create({
      deal_id,
      title,
      value,
      org_name,
      cc_email,
    })

    await this.ormRepository.save(deal);

    return deal;
  }
}