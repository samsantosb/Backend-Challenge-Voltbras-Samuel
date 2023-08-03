import { IRechargeRepository } from "../recharge.repository.interface";
import {
  mongooseRechargeModel,
  mongooseRechargeSchema,
} from "../model/recharge.mongoose.model";
import { RechargeMapper } from "../mappers/recharge.mapper";
import { RequestRechargeDTO } from "../../dtos/request.reacharge.dto";
import { Recharge } from "../../entities/recharge.entity";
import { isIdValid } from "../../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../../utils/errorHandler/error.messages";

export class RechargeMongooseRepository implements IRechargeRepository {
  constructor(private readonly rechargeModel: mongooseRechargeModel) {}

  async getAll(): Promise<Recharge[]> {
    const recharges = await this.populateRecharges(this.rechargeModel.find());

    const parsedRecharges: Recharge[] = recharges.map(
      (recharge: mongooseRechargeSchema) =>
        RechargeMapper.mongoToDomain(recharge)
    );

    return parsedRecharges;
  }

  async getById(id: string): Promise<Recharge> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const recharge = await this.populateRecharges(
      this.rechargeModel.findById(id)
    );

    const parsedRecharge = RechargeMapper.mongoToDomain(recharge);

    return parsedRecharge;
  }

  async create(recharge: RequestRechargeDTO): Promise<Recharge> {
    const newRecharge = (await this.rechargeModel.create(
      recharge
    )) as unknown as mongooseRechargeSchema;

    const parsedRecharge = RechargeMapper.mongoToDomain(newRecharge);

    return parsedRecharge;
  }

  async update(id: string, recharge: RequestRechargeDTO): Promise<Recharge> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const updatedRecharge = (await this.rechargeModel.findByIdAndUpdate(
      id,
      recharge,
      {
        new: true,
      }
    )) as mongooseRechargeSchema;

    const parsedRecharge = RechargeMapper.mongoToDomain(updatedRecharge);

    return parsedRecharge;
  }

  async softDelete(id: string): Promise<Recharge> {
    if (!isIdValid(id)) {
      throw new Error(ErrorMessages.INVALID_ID(id));
    }

    const deletedRecharge = (await this.rechargeModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    )) as mongooseRechargeSchema;

    const parsedRecharge = RechargeMapper.mongoToDomain(deletedRecharge);

    return parsedRecharge;
  }

  private populateRecharges(query: any): any {
    return query.populate(["Station", "User"]);
  }
}
