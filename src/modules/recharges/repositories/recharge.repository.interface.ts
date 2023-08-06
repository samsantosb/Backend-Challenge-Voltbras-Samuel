import { Types } from "mongoose";
import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { Recharge } from "../model/recharge.model";
import { Reservation } from "../../reservations/model/reservation.type";

export abstract class IRechargeRepository {
  abstract getAll(): Promise<Recharge[] | null>;
  abstract getAllByStationName(stationName: string): Promise<Recharge[] | null>;
  abstract getById(id: string): Promise<Recharge | null>;
  abstract create(recharge: RequestRechargeDTO): Promise<Recharge | null>;
  abstract update(
    id: string | Types.ObjectId,
    recharge: RequestRechargeDTO
  ): Promise<Recharge | null>;
  abstract getActiveRecharges(): Promise<Recharge[] | null>;
  abstract getReservationByStationName(
    stationName: string
  ): Promise<Reservation[]>;
}
