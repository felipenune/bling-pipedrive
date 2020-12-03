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
    owner_name,
    person_name,
    contact_email,
    contact_phone,
  }: IDeal): Promise<Deal> {
    const deal = this.ormRepository.create({
      deal_id,
      title,
      value,
      org_name,
      cc_email,
      owner_name,
      contact: person_name,
      contact_email,
      contact_phone,
    })

    await this.ormRepository.save(deal);

    return deal;
  }

  public async findByDealId(id: number): Promise<Deal[]> {
    const deal = await this.ormRepository.find({ deal_id: id })

    return deal;
  }

  public async listDeals(): Promise<Deal[]> {
    const deals = await this.ormRepository.find();

    return deals;
  }
}