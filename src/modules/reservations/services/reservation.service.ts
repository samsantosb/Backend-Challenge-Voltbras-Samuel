import { Recharge } from "../../recharges/model/recharge.model";
import { IRechargeService } from "../../recharges/services/recharge.service.interface";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";
import { Reservation } from "../model/reservation.type";
import { IReservationRepository } from "../repositories/reservation.repository.interface";
import { IReservationService } from "./reservation.service.interface";

export class ReservationService implements IReservationService {
  constructor(
    private readonly reservationRepository: IReservationRepository,
    private readonly rechargeService: IRechargeService
  ) {}

  async createReservation(reservation: Reservation): Promise<Reservation> {
    this.isValidDate(reservation.startDate, reservation.endDate);

    const savedReservations = await this.getAllByStationName(
      reservation.stationName
    );
    const savedRecharges = await this.rechargeService.getAllByStationName(
      reservation.stationName
    );

    const newReservationStartDate = new Date(reservation.startDate);
    const newReservationEndDate = new Date(reservation.endDate);

    const occupiedDates = [...savedReservations, ...savedRecharges];

    this.isStationBusy(
      occupiedDates,
      newReservationStartDate,
      newReservationEndDate
    );

    const reservationCreated = await this.reservationRepository.create(
      reservation
    );

    if (!reservationCreated) {
      throw new Error(ErrorMessages.CANNOT_CREATE("Reservation"));
    }
    return reservationCreated;
  }

  async createRechargeByReservation(id: string): Promise<Recharge> {
    const reservation = await this.reservationRepository.getById(id);

    if (!reservation) {
      throw new Error(ErrorMessages.NOT_FOUND("Reservation"));
    }

    const itIsUpToRecharge =
      new Date() >= reservation.startDate && new Date() <= reservation.endDate;

    if (!itIsUpToRecharge) {
      throw new Error(ErrorMessages.INCORRECT_TIME_FOR_RECHARGE);
    }

    const recharge = await this.rechargeService.create({
      stationName: reservation.stationName,
      userEmail: reservation.userEmail,
      startDate: new Date(),
      endDate: reservation.endDate,
      inProgress: true,
    });

    return recharge;
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

  private isStationBusy(
    ocupedDates: Reservation[] | Recharge[],
    inputStarDate: Date,
    inputEndDate: Date
  ) {
    ocupedDates.forEach((ocupedDate) => {
      const stationIsReservated =
        inputEndDate >= ocupedDate.startDate &&
        inputStarDate <= ocupedDate.endDate;

      if (stationIsReservated) {
        throw new Error(ErrorMessages.STATION_SERVICE_IS_BUSY);
      }
    });
  }

  private isValidDate(startDate: Date | string, endDate: Date | string) {
    const isValid =
      new Date(startDate) < new Date(endDate) ||
      new Date(startDate) < new Date();

    if (!isValid) {
      throw new Error(ErrorMessages.INVALID_DATE);
    }
  }
}
