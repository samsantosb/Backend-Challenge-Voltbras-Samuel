import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { Recharge } from "../model/recharge.model";

export abstract class IRechargeResolver {
  abstract Query: {
    getAllRecharges: () => Promise<Partial<Recharge>[]>;
    stationHistory: (
      _: any,
      { stationName }: { stationName: string }
    ) => Promise<Partial<Recharge>[]>;
  };

  abstract Mutation: {
    recharge: (
      _: any,
      { recharge }: { recharge: RequestRechargeDTO }
    ) => Promise<Partial<Recharge>>;
  };
}
