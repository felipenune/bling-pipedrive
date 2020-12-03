import { Deal } from "../schemas/Deal";
import { IDeal } from "./IDeal";

export default interface IDealRepository {
  create(data: IDeal): Promise<Deal>;
}