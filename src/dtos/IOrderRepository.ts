import { Deal } from "../schemas/Deal";
import { Order } from "../schemas/Order";
import { IDeal } from "./IDeal";
import { IOrder } from "./IOrder";

//interface for order repository
export default interface IOrderRepository {
  create(data: IOrder): Promise<Order>;
  update(data: IDeal, date: string): Promise<Order | null>;
  findDeal(id: number, date: string): Promise<Deal | null>;
  findByDate(date: string): Promise<Order | null>;
  listOrders(): Promise<Order[]>;
}