import { Reservation } from "../model/reservation.type";

export abstract class IReservationRepository {
  abstract createReservation(reservation: Reservation): Promise<Reservation>;
  abstract getAll(): Promise<Reservation[]>;
  abstract update(id: string, reservation: Reservation): Promise<Reservation>;
}
