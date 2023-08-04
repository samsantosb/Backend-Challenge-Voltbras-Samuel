import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { Recharge } from "../entities/recharge.entity";

export abstract class IRechargeResolver {
  abstract Query: {
    getAllRecharges: () => Promise<Partial<Recharge>[]>;
    getRechargeById: (
      _: any,
      { id }: { id: string }
    ) => Promise<Partial<Recharge>>;
  };

  abstract Mutation: {
    createRecharge: (
      _: any,
      { recharge }: { recharge: RequestRechargeDTO }
    ) => Promise<Partial<Recharge>>;
    updateRecharge: (
      _: any,
      { id, recharge }: { id: string; recharge: RequestRechargeDTO }
    ) => Promise<Partial<Recharge>>;
    deleteRecharge: (
      _: any,
      { id }: { id: string }
    ) => Promise<Partial<Recharge>>;
  };
}
