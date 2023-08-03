import { RequestReservationDTO } from "../dtos/request.reservation.dto";
import { Reservation } from "../entities/reservation.entity";

export abstract class IReservationService {
  abstract getAll(): Promise<Reservation[]>;
  abstract getById(id: string): Promise<Reservation>;
  abstract create(data: RequestReservationDTO): Promise<Reservation>;
  abstract update(
    id: string,
    data: RequestReservationDTO
  ): Promise<Reservation>;
  abstract softDelete(id: string): Promise<Reservation>;
}
