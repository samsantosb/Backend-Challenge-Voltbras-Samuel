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
    stationHistory: async (
      _: any,
      { stationName }: { stationName: string }
    ) => {
      const stationHistory = await this.rechargeService.getAllByStationsByName(
        stationName
      );

      return stationHistory;
    },
  };

  public Mutation = {
    recharge: async (
      _: any,
      { recharge }: { recharge: RequestRechargeDTO }
    ) => {
      const request = new RequestRechargeDTO(recharge);

      const newRecharge = await this.rechargeService.create(request);

      return newRecharge;
    },
  };
}
