import { ReservationModel } from "../model/reservation.mongoose.model";
import { ReservationMongooseRepository } from "../repositories/reservation.mongoose.repository";
import { ReservationService } from "../services/reservation.service";
import { ReservationResolver } from "../resolvers/reservation.resolver";
import { rechargeModule } from "../../recharges/factories/recharge.factory";

function reservationFactory() {
  const mongooseRepository = new ReservationMongooseRepository(
    ReservationModel
  );
  const reservationService = new ReservationService(
    mongooseRepository,
    rechargeModule.rechargeService
  );
  const { Query, Mutation } = new ReservationResolver(reservationService);

  return { Query, Mutation, mongooseRepository, reservationService };
}

export const reservationModule = reservationFactory();
