import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { IRechargeRepository } from "../repositories/recharge.repository.interface";
import { IRechargeService } from "./recharge.service.interface";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";
import { IUserService } from "../../users/services/user.service.interface";
import { IStationService } from "../../stations/services/station.service.interface";
import { Recharge } from "../model/recharge.model";

export class RechargeService implements IRechargeService {
  constructor(
    private readonly rechargeRepository: IRechargeRepository,
    private readonly userService: IUserService,
    private readonly stationService: IStationService
  ) {}

  async getAll() {
    const recharges = await this.rechargeRepository.getAll();

    if (!recharges) {
      throw new Error(ErrorMessages.NOT_FOUND("Recharges"));
    }

    return recharges;
  }

  async getById(id: string) {
    const recharge = await this.rechargeRepository.getById(id);

    if (!recharge) {
      throw new Error(ErrorMessages.NOT_FOUND(`Recharge with id ${id}`));
    }

    return recharge;
  }

  async create(recharge: RequestRechargeDTO) {
    //se falharem as chamadas quer dizer que nao existe
    await this.userService.getById(recharge.userId);
    await this.stationService.getById(recharge.stationId);

    const recharges = (await this.rechargeRepository.getAll()) as Recharge[];

    if (this.isRecharing(recharges, recharge, "stationId")) {
      throw new Error(ErrorMessages.STATION_SERVICE_IS_BUSY);
    }

    if (this.isRecharing(recharges, recharge, "userId")) {
      throw new Error(ErrorMessages.USER_IS_BUSY);
    }
    const newRecharge = await this.rechargeRepository.create(recharge);

    if (!newRecharge) {
      throw new Error(ErrorMessages.CANNOT_CREATE("Recharge"));
    }

    return newRecharge;
  }

  async update(id: string, recharge: RequestRechargeDTO) {
    const updatedRecharge = await this.rechargeRepository.update(id, recharge);

    if (!updatedRecharge) {
      throw new Error(ErrorMessages.CANNOT_UPDATE(`Recharge with id ${id}`));
    }

    return updatedRecharge;
  }

  private isRecharing(
    recharges: Recharge[],
    recharge: RequestRechargeDTO,
    id: keyof RequestRechargeDTO
  ) {
    return recharges.some(
      (dbRecharge) =>
        JSON.stringify(dbRecharge[id]) === JSON.stringify(recharge[id]) &&
        dbRecharge.inProgress === true
    );
  }
}
