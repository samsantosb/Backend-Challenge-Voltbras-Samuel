import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { Recharge } from "../entities/recharge.entity";

export abstract class IRechargeRepository {
  abstract getAll(): Promise<Recharge[] | null>;
  abstract getById(id: string): Promise<Recharge | null>;
  abstract create(recharge: RequestRechargeDTO): Promise<Recharge | null>;
  abstract update(
    id: string,
    recharge: RequestRechargeDTO
  ): Promise<Recharge | null>;
  abstract softDelete(id: string): Promise<Recharge | null>;
}
