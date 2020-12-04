import { getMongoRepository, MongoRepository } from "typeorm";
import { IDeal } from "../dtos/IDeal";
import { IOrder } from "../dtos/IOrder";
import IOrderRepository from "../dtos/IOrderRepository";
import { Deal } from "../schemas/Deal";
import { Order } from "../schemas/Order";

export default class OrderRepository implements IOrderRepository {
  private ormRepository: MongoRepository<Order>;

  constructor() {
    this.ormRepository = getMongoRepository(Order, "default")
  }

  //save a new order in the database
  public async create({
    date,
    deals,
    total,
  }: IOrder): Promise<Order> {
    const order = this.ormRepository.create({
      date,
      deals,
      total,
    })

    await this.ormRepository.save(order);

    return order;
  }

  //insert a new deal in a order in the database
  public async update({
    deal_id,
    title,
    value,
    org_name,
    cc_email,
    owner_name,
    person_name = '',
    won_time,
    contact_email = '',
    contact_phone = '',
  }: IDeal, date: string): Promise<Order | null> {
    //get the order by date
    const orderSaved = await this.ormRepository.findOne({ date })

    const new_deal: Deal = {
      deal_id,
      title,
      value,
      org_name,
      cc_email,
      owner_name,
      contact: person_name,
      won_time,
      contact_email,
      contact_phone,
    }

    if(orderSaved) {
      //insert the new deal
      orderSaved.deals.push(new_deal);

      //update the total value
      orderSaved.total += new_deal.value;
      
      //update the order
      const order = await this.ormRepository.save(orderSaved);

      return order;
    }

    return null;
  }

  public async findDeal(id: number, date: string): Promise<Deal | null> {
    //find a order by date
    const order = await this.ormRepository.findOne({ date })

    //check if the deal is already in the database
    if(order) {
      const deal = order.deals.filter((dealSaved: Deal) => dealSaved.deal_id === id)

      return deal[0];
    }

    return null
  }

  public async findByDate(date: string): Promise<Order | null> {
    const order = await this.ormRepository.findOne({ date })

    if(order) {
      return order;
    }

    return null
  }

  public async listOrders(): Promise<Order[]> {
    const orders = await this.ormRepository.find();

    return orders;
  }
}