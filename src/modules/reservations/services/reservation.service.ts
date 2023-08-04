import { RequestReservationDTO } from "../dtos/request.reservation.dto";
import { IReservationRepository } from "../repositories/reservation.repository.interface";
import { IReservationService } from "./reservation.service.interface";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";

export class ReservationService implements IReservationService {
  constructor(private readonly reservationRepository: IReservationRepository) {}

  async getAll() {
    const reservations = await this.reservationRepository.getAll();

    if (!reservations) {
      throw new Error(ErrorMessages.NOT_FOUND("Reservations"));
    }

    return reservations;
  }

  async getById(id: string) {
    const reservation = await this.reservationRepository.getById(id);

    if (!reservation) {
      throw new Error(ErrorMessages.NOT_FOUND(`Reservation with id ${id}`));
    }

    return reservation;
  }

  async create(reservation: RequestReservationDTO) {
    const newReservation = await this.reservationRepository.create(reservation);

    if (!newReservation) {
      throw new Error(ErrorMessages.CANNOT_CREATE("Reservation"));
    }

    return newReservation;
  }

  async update(id: string, reservation: RequestReservationDTO) {
    const updatedReservation = await this.reservationRepository.update(
      id,
      reservation
    );

    if (!updatedReservation) {
      throw new Error(ErrorMessages.CANNOT_UPDATE(`Reservation with id ${id}`));
    }

    return updatedReservation;
  }

  async softDelete(id: string) {
    const deletedReservation = await this.reservationRepository.softDelete(id);

    if (!deletedReservation) {
      throw new Error(ErrorMessages.CANNOT_DELETE(`Reservation with id ${id}`));
    }

    return deletedReservation;
  }
}
