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
    const recharges = await this.populateRecharges(this.rechargeModel.find());

    return recharges;
  }

  async getById(id: string): Promise<Recharge> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const recharge = await this.populateRecharges(
      this.rechargeModel.findById(id)
    );

    return recharge;
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

  async softDelete(id: string): Promise<Recharge | null> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const deletedRecharge = await this.rechargeModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    return deletedRecharge;
  }

  private populateRecharges(query: any): any {
    return query.populate(["station", "user"]);
  }
}
