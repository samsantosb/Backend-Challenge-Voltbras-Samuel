import { isValid } from "zod";
import { mongooseReservationModel } from "../model/reservation.mongoose.model";
import { Reservation } from "../model/reservation.type";
import { IReservationRepository } from "./reservation.repository.interface";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";
import { isIdValid } from "../../utils/validators/mongo.id.validator";

export class ReservationMongooseRepository implements IReservationRepository {
  constructor(private readonly reservationModel: mongooseReservationModel) {}

  async createReservation(reservation: Reservation): Promise<Reservation> {
    const reservationCreated = await this.reservationModel.create(reservation);
    return reservationCreated;
  }

  async getAll(): Promise<Reservation[]> {
    const reservations = await this.reservationModel.find();
    return reservations;
  }

  async getAllByStationName(stationName: string): Promise<Reservation[]> {
    const reservations = await this.reservationModel.find({
      stationName: stationName,
    });
    return reservations;
  }

  async update(id: string, reservation: Reservation): Promise<Reservation> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const reservationUpdated = (await this.reservationModel.findByIdAndUpdate(
      id,
      reservation
    )) as Reservation;
    return reservationUpdated;
  }
}
