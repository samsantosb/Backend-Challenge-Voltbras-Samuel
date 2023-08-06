import { Types } from "mongoose";
import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { Recharge } from "../model/recharge.model";

export abstract class IRechargeService {
  abstract getAll(): Promise<Recharge[]>;
  abstract getAllByStationName(stationName: string): Promise<Recharge[]>;
  abstract getById(id: string | Types.ObjectId): Promise<Recharge>;
  abstract create(data: RequestRechargeDTO): Promise<Recharge>;
}
