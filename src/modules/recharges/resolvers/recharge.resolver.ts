import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { IRechargeService } from "../services/recharge.service.interface";
import { IRechargeResolver } from "./recharge.resolver.interface";

export class RechargeResolver implements IRechargeResolver {
  constructor(private rechargeService: IRechargeService) {}

  public Query = {
    getAllRecharges: async () => {
      const recharges = await this.rechargeService.getAll();

      return recharges;
    },
    getRechargeById: async (_: any, { id }: { id: string }) => {
      const recharge = await this.rechargeService.getById(id);

      return recharge;
    },
  };

  public Mutation = {
    createRecharge: async (
      _: any,
      { recharge }: { recharge: RequestRechargeDTO }
    ) => {
      const request = new RequestRechargeDTO(recharge);

      const newRecharge = await this.rechargeService.create(request);

      return newRecharge;
    },
    updateRecharge: async (
      _: any,
      { id, recharge }: { id: string; recharge: RequestRechargeDTO }
    ) => {
      const request = new RequestRechargeDTO(recharge);

      const updatedRecharge = await this.rechargeService.update(id, request);

      return updatedRecharge;
    },
    deleteRecharge: async (_: any, { id }: { id: string }) => {
      const deletedRecharge = await this.rechargeService.softDelete(id);

      return deletedRecharge;
    },
  };
}
