import { RequestReservationDTO } from "../dtos/request.reservation.dto";
import { Reservation } from "../model/reservation.type";

export abstract class IReservationService {
  abstract createReservation(
    reservation: RequestReservationDTO
  ): Promise<Reservation>;
  abstract getAll(): Promise<Reservation[]>;
  abstract update(
    id: string,
    reservation: RequestReservationDTO
  ): Promise<Reservation>;
}
