import { ReservationModel } from "../repositories/model/reservation.mongoose.model";
import { ReservationMongooseRepository } from "../repositories/implementation/reservation.mongoose.repository";
import { ReservationService } from "../services/implementation/reservation.service";
import { ReservationResolver } from "../resolvers/implementation/reservation.resolver";

function reservationFactory() {
  const mongooseRepository = new ReservationMongooseRepository(
    ReservationModel
  );
  const service = new ReservationService(mongooseRepository);
  const { Query, Mutation } = new ReservationResolver(service);

  return { Query, Mutation };
}

export const reservationModule = reservationFactory();
