import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { Recharge } from "../model/recharge.model";

export abstract class IRechargeService {
  abstract getAll(): Promise<Recharge[]>;
  abstract getById(id: string): Promise<Recharge>;
  abstract create(data: RequestRechargeDTO): Promise<Recharge>;
  abstract update(id: string, data: RequestRechargeDTO): Promise<Recharge>;
}
