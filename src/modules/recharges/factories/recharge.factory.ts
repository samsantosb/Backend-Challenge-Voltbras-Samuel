import { RechargeModel } from "../model/recharge.mongoose.model";
import { RechargeMongooseRepository } from "../repositories/recharge.mongoose.repository";
import { RechargeService } from "../services/recharge.service";
import { RechargeResolver } from "../resolvers/recharge.resolver";
import { userModule } from "../../users/factories/user.factory";
import { stationModule } from "../../stations/factories/station.factory";
import { RechargeAgendaService } from "../services/agenda/recharge.agenda.service";

function rechargeFactory() {
  const rechargeMongooseRepository = new RechargeMongooseRepository(
    RechargeModel
  );

  const rechargeAgendaService = new RechargeAgendaService(
    rechargeMongooseRepository
  );

  const rechargeservice = new RechargeService(
    rechargeMongooseRepository,
    userModule.userService,
    stationModule.stationService
  );

  const { Query, Mutation } = new RechargeResolver(rechargeservice);

  return { Query, Mutation, rechargeAgendaService };
}

export const rechargeModule = rechargeFactory();
