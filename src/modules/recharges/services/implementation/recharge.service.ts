import { RequestRechargeDTO } from "../../dtos/request.reacharge.dto";
import { IRechargeRepository } from "../../repositories/recharge.repository.interface";
import { IRechargeService } from "../recharge.service.interface";
import { ErrorMessages } from "../../../utils/errorHandler/error.messages";

export class RechargeService implements IRechargeService {
  constructor(private readonly rechargeRepository: IRechargeRepository) {}

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

  async softDelete(id: string) {
    const deletedRecharge = await this.rechargeRepository.softDelete(id);

    if (!deletedRecharge) {
      throw new Error(ErrorMessages.CANNOT_DELETE(`Recharge with id ${id}`));
    }

    return deletedRecharge;
  }
}
