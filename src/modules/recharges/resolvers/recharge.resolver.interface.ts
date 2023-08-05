import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { Recharge } from "../model/recharge.model";

export abstract class IRechargeResolver {
  abstract Query: {
    getAllRecharges: () => Promise<Partial<Recharge>[]>;
    getRechargeById: (
      _: any,
      { id }: { id: string }
    ) => Promise<Partial<Recharge>>;
  };

  abstract Mutation: {
    recharge: (
      _: any,
      { recharge }: { recharge: RequestRechargeDTO }
    ) => Promise<Partial<Recharge>>;
    updateRecharge: (
      _: any,
      { id, recharge }: { id: string; recharge: RequestRechargeDTO }
    ) => Promise<Partial<Recharge>>;
  };
}
