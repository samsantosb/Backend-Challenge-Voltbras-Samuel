import { ReservationModel } from "../model/reservation.mongoose.model";
import { ReservationMongooseRepository } from "../repositories/reservation.mongoose.repository";
import { ReservationService } from "../services/reservation.service";
import { ReservationResolver } from "../resolvers/reservation.resolver";

function reservationFactory() {
  const mongooseRepository = new ReservationMongooseRepository(
    ReservationModel
  );
  const reservationService = new ReservationService(mongooseRepository);
  const { Query, Mutation } = new ReservationResolver(reservationService);

  return { Query, Mutation, reservationService };
}

export const reservationModule = reservationFactory();
