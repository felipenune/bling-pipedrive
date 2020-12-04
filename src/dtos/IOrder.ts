import { IDeal } from "./IDeal";

//interface for type order
export interface IOrder {
  date: string;
  deals: IDeal[];
  total: number;
}