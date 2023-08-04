import { RequestReservationDTO } from "../dtos/request.reservation.dto";
import { Reservation } from "../model/reservation.type";

export abstract class IReservationRepository {
  abstract getAll(): Promise<Reservation[] | null>;
  abstract getById(id: string): Promise<Reservation | null>;
  abstract create(
    reservation: RequestReservationDTO
  ): Promise<Reservation | null>;
  abstract update(
    id: string,
    reservation: RequestReservationDTO
  ): Promise<Reservation | null>;
  abstract softDelete(id: string): Promise<Reservation | null>;
}
