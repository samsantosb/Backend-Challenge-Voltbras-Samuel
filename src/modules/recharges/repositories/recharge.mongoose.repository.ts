import { IRechargeRepository } from "./recharge.repository.interface";
import {
  mongooseRechargeModel,
  mongooseRechargeSchema,
} from "../model/recharge.mongoose.model";
import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { Recharge } from "../model/recharge.model";
import { isIdValid } from "../../utils/validators/mongo.id.validator";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";
import { mongooseReservationModel } from "../../reservations/model/reservation.mongoose.model";
import { Reservation } from "../../reservations/model/reservation.type";

export class RechargeMongooseRepository implements IRechargeRepository {
  constructor(
    private readonly rechargeModel: mongooseRechargeModel,
    private readonly reservationModel: mongooseReservationModel
  ) {}

  async getAll(): Promise<Recharge[]> {
    const recharges = await this.rechargeModel.find();

    return recharges;
  }

  async getAllByStationName(stationName: string): Promise<Recharge[]> {
    const recharges = (await this.rechargeModel.find({
      stationName: stationName,
    })) as Recharge[];

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

  async getReservationByStationName(stationName: string) {
    const reservationDates = (await this.reservationModel.find({
      stationName: stationName,
    })) as Reservation[];

    return reservationDates;
  }
}
