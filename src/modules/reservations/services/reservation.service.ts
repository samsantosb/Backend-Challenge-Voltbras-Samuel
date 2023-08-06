import { ErrorMessages } from "../../utils/errorHandler/error.messages";
import { Reservation } from "../model/reservation.type";
import { IReservationRepository } from "../repositories/reservation.repository.interface";
import { IReservationService } from "./reservation.service.interface";

export class ReservationService implements IReservationService {
  constructor(private readonly reservationRepository: IReservationRepository) {}

  async createReservation(reservation: Reservation): Promise<Reservation> {
    const reservationCreated =
      await this.reservationRepository.createReservation(reservation);

    if (!reservationCreated) {
      throw new Error(ErrorMessages.CANNOT_CREATE("Reservation"));
    }
    return reservationCreated;
  }

  async getAll(): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.getAll();

    if (!reservations) {
      throw new Error(ErrorMessages.NOT_FOUND("Reservations"));
    }

    return reservations;
  }

  async update(id: string, reservation: Reservation): Promise<Reservation> {
    const reservationUpdated = (await this.reservationRepository.update(
      id,
      reservation
    )) as Reservation;

    if (!reservationUpdated) {
      throw new Error(ErrorMessages.CANNOT_UPDATE("Reservation"));
    }

    return reservationUpdated;
  }
}
