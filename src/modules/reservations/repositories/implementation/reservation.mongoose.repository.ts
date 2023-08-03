import { IReservationRepository } from "../reservation.repository.interface";
import {
  mongooseReservationModel,
  mongooseReservationSchema,
} from "../model/reservation.mongoose.model";
import { ReservationMapper } from "../mappers/reservation.mapper";
import { RequestReservationDTO } from "../../dtos/request.reservation.dto";
import { Reservation } from "../../entities/reservation.entity";
import { isIdValid } from "../../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../../utils/errorHandler/error.messages";

export class ReservationMongooseRepository implements IReservationRepository {
  constructor(private readonly reservationModel: mongooseReservationModel) {}

  async getAll(): Promise<Reservation[]> {
    const reservations = await this.populateReservations(
      this.reservationModel.find()
    );

    const parsedReservations: Reservation[] = reservations.map(
      (reservation: mongooseReservationSchema) =>
        ReservationMapper.mongoToDomain(reservation)
    );

    return parsedReservations;
  }

  async getById(id: string): Promise<Reservation> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const reservation = await this.populateReservations(
      this.reservationModel.findById(id)
    );

    const parsedReservation = ReservationMapper.mongoToDomain(reservation);

    return parsedReservation;
  }

  async create(reservation: RequestReservationDTO): Promise<Reservation> {
    const newReservation = (await this.reservationModel.create(
      reservation
    )) as unknown as mongooseReservationSchema;

    const parsedReservation = ReservationMapper.mongoToDomain(newReservation);

    return parsedReservation;
  }

  async update(
    id: string,
    reservation: RequestReservationDTO
  ): Promise<Reservation> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const updatedReservation = (await this.reservationModel.findByIdAndUpdate(
      id,
      reservation,
      {
        new: true,
      }
    )) as mongooseReservationSchema;

    const parsedReservation =
      ReservationMapper.mongoToDomain(updatedReservation);

    return parsedReservation;
  }

  async softDelete(id: string): Promise<Reservation> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const deletedReservation = (await this.reservationModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    )) as mongooseReservationSchema;

    const parsedReservation =
      ReservationMapper.mongoToDomain(deletedReservation);

    return parsedReservation;
  }

  private populateReservations(query: any): any {
    return query.populate(["Station", "User"]);
  }
}
