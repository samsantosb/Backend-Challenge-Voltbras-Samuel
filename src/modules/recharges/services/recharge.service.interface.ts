import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { Recharge } from "../entities/recharge.entity";

export abstract class IRechargeService {
  abstract getAll(): Promise<Recharge[]>;
  abstract getById(id: string): Promise<Recharge>;
  abstract create(data: RequestRechargeDTO): Promise<Recharge>;
  abstract update(id: string, data: RequestRechargeDTO): Promise<Recharge>;
  abstract softDelete(id: string): Promise<Recharge>;
}
