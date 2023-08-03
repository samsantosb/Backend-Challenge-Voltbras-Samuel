import { mongooseRechargeSchema } from "../model/recharge.mongoose.model";
import { Recharge } from "../../entities/recharge.entity";

export class RechargeMapper {
  static mongoToDomain(recharge: mongooseRechargeSchema): Recharge {
    const rawRecharge = {
      _id: recharge._id.toString(),
      station: recharge.station.toString(),
      user: recharge.user.toString(),
      inProgress: recharge.inProgress,
      startDate: recharge.startDate,
      endDate: recharge.endDate,
      createdAt: recharge.createdAt,
      updatedAt: recharge.updatedAt,
      deletedAt: recharge.deletedAt,
    };

    return rawRecharge;
  }
}
