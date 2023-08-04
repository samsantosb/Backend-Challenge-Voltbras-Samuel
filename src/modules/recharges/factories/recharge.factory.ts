import { RechargeModel } from "../model/recharge.mongoose.model";
import { RechargeMongooseRepository } from "../repositories/recharge.mongoose.repository";
import { RechargeService } from "../services/recharge.service";
import { RechargeResolver } from "../resolvers/recharge.resolver";

function rechargeFactory() {
  const mongooseRepository = new RechargeMongooseRepository(RechargeModel);
  const service = new RechargeService(mongooseRepository);
  const { Query, Mutation } = new RechargeResolver(service);

  return { Query, Mutation };
}

export const rechargeModule = rechargeFactory();
