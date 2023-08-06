import { Recharge } from "../../recharges/model/recharge.model";
import { RequestReservationDTO } from "../dtos/request.reservation.dto";
import { Reservation } from "../model/reservation.type";

export abstract class IReservationService {
  abstract createReservation(
    reservation: RequestReservationDTO
  ): Promise<Reservation>;
  abstract createRechargeByReservation(id: string): Promise<Recharge>;
  abstract getAll(): Promise<Reservation[]>;
  abstract getAllByStationName(stationName: string): Promise<Reservation[]>;
  abstract update(
    id: string,
    reservation: RequestReservationDTO
  ): Promise<Reservation>;
}
