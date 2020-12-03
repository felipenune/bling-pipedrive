import { Deal } from "../schemas/Deal";
import { IDeal, IDealReturn } from "./IDeal";

export default interface IDealRepository {
  create(data: IDeal): Promise<Deal>;
  findByDealId(id: number): Promise<Deal[]>;
  listDeals(): Promise<Deal[]>;
}