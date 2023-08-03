import { RequestRechargeDTO } from "../../dtos/request.reacharge.dto";
import { ResponseRechargeDTO } from "../../dtos/response.recharge.dto";
import { IRechargeService } from "../../services/recharge.service.interface";
import { IRechargeResolver } from "../recharge.resolver.interface";

export class RechargeResolver implements IRechargeResolver {
  constructor(private rechargeService: IRechargeService) {}

  public Query = {
    getAllRecharges: async () => {
      const recharges = await this.rechargeService.getAll();

      const response = recharges.map(
        (recharge) => new ResponseRechargeDTO(recharge)
      );

      return response;
    },
    getRechargeById: async (_: any, { id }: { id: string }) => {
      const recharge = await this.rechargeService.getById(id);

      const response = new ResponseRechargeDTO(recharge);

      return response;
    },
  };

  public Mutation = {
    createRecharge: async (
      _: any,
      { recharge }: { recharge: RequestRechargeDTO }
    ) => {
      const request = new RequestRechargeDTO(recharge);

      const newRecharge = await this.rechargeService.create(request);

      const response = new ResponseRechargeDTO(newRecharge);

      return response;
    },
    updateRecharge: async (
      _: any,
      { id, recharge }: { id: string; recharge: RequestRechargeDTO }
    ) => {
      const request = new RequestRechargeDTO(recharge);

      const updatedRecharge = await this.rechargeService.update(id, request);

      const response = new ResponseRechargeDTO(updatedRecharge);

      return response;
    },
    deleteRecharge: async (_: any, { id }: { id: string }) => {
      const deletedRecharge = await this.rechargeService.softDelete(id);

      const response = new ResponseRechargeDTO(deletedRecharge);

      return response;
    },
  };
}
