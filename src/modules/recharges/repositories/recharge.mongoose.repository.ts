import { IRechargeRepository } from "./recharge.repository.interface";
import {
  mongooseRechargeModel,
  mongooseRechargeSchema,
} from "../model/recharge.mongoose.model";
import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { Recharge } from "../model/recharge.model";
import { isIdValid } from "../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";

export class RechargeMongooseRepository implements IRechargeRepository {
  constructor(private readonly rechargeModel: mongooseRechargeModel) {}

  async getAll(): Promise<Recharge[]> {
    const recharges = await this.rechargeModel.find();

    return recharges;
  }

  async getById(id: string): Promise<Recharge> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const recharge = (await this.rechargeModel.findById(id)) as Recharge;
    return recharge;
  }

  async getActiveRecharges() {
    const recharges = (await this.rechargeModel.find({
      inProgress: true,
    })) as Recharge[];

    return recharges;
  }

  async create(recharge: RequestRechargeDTO): Promise<Recharge> {
    const newRecharge = await this.rechargeModel.create(recharge);

    return newRecharge;
  }

  async update(
    id: string,
    recharge: RequestRechargeDTO
  ): Promise<Recharge | null> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const updatedRecharge = await this.rechargeModel.findByIdAndUpdate(
      id,
      recharge,
      {
        new: true,
      }
    );

    return updatedRecharge;
  }
}
