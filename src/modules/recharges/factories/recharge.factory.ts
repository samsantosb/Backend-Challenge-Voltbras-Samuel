import { RechargeModel } from "../repositories/model/recharge.mongoose.model";
import { RechargeMongooseRepository } from "../repositories/implementation/recharge.mongoose.repository";
import { RechargeService } from "../services/implementation/recharge.service";
import { RechargeResolver } from "../resolvers/implementation/recharge.resolver";

function rechargeFactory() {
  const mongooseRepository = new RechargeMongooseRepository(RechargeModel);
  const service = new RechargeService(mongooseRepository);
  const { Query, Mutation } = new RechargeResolver(service);

  return { Query, Mutation };
}

export const rechargeModule = rechargeFactory();
