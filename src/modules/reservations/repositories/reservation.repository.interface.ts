import { Reservation } from "../model/reservation.type";

export abstract class IReservationRepository {
  abstract create(reservation: Reservation): Promise<Reservation>;
  abstract getAll(): Promise<Reservation[]>;
  abstract getById(id: string): Promise<Reservation>;
  abstract getAllByStationName(stationName: string): Promise<Reservation[]>;
  abstract update(id: string, reservation: Reservation): Promise<Reservation>;
}
