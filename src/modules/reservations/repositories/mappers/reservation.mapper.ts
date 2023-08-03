import { mongooseReservationSchema } from "../model/reservation.mongoose.model";
import { Reservation } from "../../entities/reservation.entity";

export class ReservationMapper {
  static mongoToDomain(reservation: mongooseReservationSchema): Reservation {
    const rawReservation = {
      _id: reservation._id.toString(),
      station: reservation.station.toString(),
      user: reservation.user.toString(),
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      inProgress: reservation.inProgress,
      createdAt: reservation.createdAt,
      updatedAt: reservation.updatedAt,
      deletedAt: reservation.deletedAt,
    };

    return rawReservation;
  }
}
