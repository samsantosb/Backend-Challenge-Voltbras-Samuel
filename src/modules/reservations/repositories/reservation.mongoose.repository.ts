import { IReservationRepository } from "./reservation.repository.interface";
import {
  mongooseReservationModel,
  mongooseReservationSchema,
} from "../model/reservation.mongoose.model";
import { RequestReservationDTO } from "../dtos/request.reservation.dto";
import { Reservation } from "../model/reservation.type";
import { isIdValid } from "../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";

export class ReservationMongooseRepository implements IReservationRepository {
  constructor(private readonly reservationModel: mongooseReservationModel) {}

  async getAll(): Promise<Reservation[]> {
    const reservations = await this.populateReservations(
      this.reservationModel.find()
    );

    return reservations;
  }

  async getById(id: string): Promise<Reservation> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const reservation = await this.populateReservations(
      this.reservationModel.findById(id)
    );

    return reservation;
  }

  async create(reservation: RequestReservationDTO): Promise<Reservation> {
    const newReservation = await this.reservationModel.create(reservation);

    return newReservation;
  }

  async update(
    id: string,
    reservation: RequestReservationDTO
  ): Promise<Reservation | null> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const updatedReservation = await this.reservationModel.findByIdAndUpdate(
      id,
      reservation,
      {
        new: true,
      }
    );

    return updatedReservation;
  }

  async softDelete(id: string): Promise<Reservation | null> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const deletedReservation = await this.reservationModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    return deletedReservation;
  }

  private populateReservations(query: any): any {
    return query.populate(["station", "user"]);
  }
}
