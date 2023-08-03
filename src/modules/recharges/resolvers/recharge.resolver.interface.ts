import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { ResponseRechargeDTO } from "../dtos/response.recharge.dto";

export abstract class IRechargeResolver {
  abstract Query: {
    getAllRecharges: () => Promise<ResponseRechargeDTO[]>;
    getRechargeById: (
      _: any,
      { id }: { id: string }
    ) => Promise<ResponseRechargeDTO>;
  };

  abstract Mutation: {
    createRecharge: (
      _: any,
      { recharge }: { recharge: RequestRechargeDTO }
    ) => Promise<ResponseRechargeDTO>;
    updateRecharge: (
      _: any,
      { id, recharge }: { id: string; recharge: RequestRechargeDTO }
    ) => Promise<ResponseRechargeDTO>;
    deleteRecharge: (
      _: any,
      { id }: { id: string }
    ) => Promise<ResponseRechargeDTO>;
  };
}
