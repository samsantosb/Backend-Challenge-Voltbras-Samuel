import { Recharge } from "../../recharges/model/recharge.model";
import { IRechargeService } from "../../recharges/services/recharge.service.interface";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";
import { utcDate } from "../../utils/parsers/utc.date.parser";
import { Reservation } from "../model/reservation.type";
import { IReservationRepository } from "../repositories/reservation.repository.interface";
import { IReservationService } from "./reservation.service.interface";

export class ReservationService implements IReservationService {
  constructor(
    private readonly reservationRepository: IReservationRepository,
    private readonly rechargeService: IRechargeService
  ) {}

  async createReservation(reservation: Reservation): Promise<Reservation> {
    const savedReservations = await this.getAllByStationName(
      reservation.stationName
    );
    const savedRecharges = await this.rechargeService.getAllByStationName(
      reservation.stationName
    );

    const newReservation = utcDate(reservation.startDate);

    this.doestReservationConflict(savedReservations, newReservation);
    this.doestReservationConflict(savedRecharges, newReservation);

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

  async getAllByStationName(stationName: string): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.getAllByStationName(
      stationName
    );

    if (!reservations) {
      throw new Error(
        ErrorMessages.NOT_FOUND(`Reservations with station name ${stationName}`)
      );
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

  private doestReservationConflict(
    ocupedDates: Reservation[] | Recharge[],
    reserve: Date
  ) {
    ocupedDates.forEach((ocupedDate) => {
      const newReservationEndsAfter = reserve > ocupedDate.startDate;
      const newReservationEndsBefore = reserve < ocupedDate.endDate;

      if (newReservationEndsAfter && newReservationEndsBefore) {
        throw new Error(ErrorMessages.RESERVATION_ALREADY_EXISTS);
      }
    });
  }
}
