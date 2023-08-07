import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { IRechargeRepository } from "../repositories/recharge.repository.interface";
import { IRechargeService } from "./recharge.service.interface";
import { ErrorMessages } from "../../utils/errorHandler/error.messages";
import { IUserService } from "../../users/services/user.service.interface";
import { IStationService } from "../../stations/services/station.service.interface";
import { Recharge } from "../model/recharge.model";
import { Reservation } from "../../reservations/model/reservation.type";

export class RechargeService implements IRechargeService {
  constructor(
    private readonly rechargeRepository: IRechargeRepository,
    private readonly userService: IUserService,
    private readonly stationService: IStationService
  ) {}

  async create(recharge: RequestRechargeDTO) {
    this.isValidDate(recharge.endDate);

    await this.validateRechargeInputs(recharge.userEmail, recharge.stationName);

    const recharges = (await this.rechargeRepository.getAll()) as Recharge[];

    if (this.isStationRecharging(recharges, recharge, "stationName")) {
      throw new Error(ErrorMessages.STATION_SERVICE_IS_BUSY);
    }

    if (this.isStationRecharging(recharges, recharge, "userEmail")) {
      throw new Error(ErrorMessages.USER_IS_BUSY);
    }

    const reservations =
      await this.rechargeRepository.getReservationByStationName(
        recharge.stationName
      );

    this.isStationReservedByOtherUser(
      recharge.userEmail,
      reservations,
      new Date(recharge.startDate),
      new Date(recharge.endDate)
    );

    const newRecharge = await this.rechargeRepository.create(recharge);

    if (!newRecharge) {
      throw new Error(ErrorMessages.CANNOT_CREATE("Recharge"));
    }

    return newRecharge;
  }

  async getAll() {
    const recharges = await this.rechargeRepository.getAll();

    if (!recharges) {
      throw new Error(ErrorMessages.NOT_FOUND("Recharges"));
    }

    return recharges;
  }

  async getAllByStationName(stationName: string) {
    const recharges = await this.rechargeRepository.getAllByStationName(
      stationName
    );

    if (!recharges) {
      throw new Error(
        ErrorMessages.NOT_FOUND(`Recharges with station name ${stationName}`)
      );
    }

    const rechargesWithTotalHours = this.insertTotalHours(recharges);

    return rechargesWithTotalHours;
  }

  async getById(id: string) {
    const recharge = await this.rechargeRepository.getById(id);

    if (!recharge) {
      throw new Error(ErrorMessages.NOT_FOUND(`Recharge with id ${id}`));
    }

    return recharge;
  }

  private isStationRecharging(
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

  private isStationReservedByOtherUser(
    rechargeUserEmail: string,
    reservations: Reservation[],
    rechargeInputStartDate: Date,
    rechargeInputEndDate: Date
  ) {
    const hasConflictWithOtheruser = reservations.some((reservation) => {
      const isOtherUser = reservation.userEmail !== rechargeUserEmail;

      const dateConflict =
        rechargeInputEndDate >= reservation.startDate &&
        rechargeInputStartDate <= reservation.endDate;

      return isOtherUser && dateConflict;
    });

    if (hasConflictWithOtheruser) {
      throw new Error(ErrorMessages.STATION_SERVICE_IS_BUSY);
    }
  }

  private async validateRechargeInputs(userEmail: string, stationName: string) {
    await this.userService.getByEmail(userEmail);
    await this.stationService.getByName(stationName);
  }

  private insertTotalHours(recharges: Recharge[]): Recharge[] {
    recharges.forEach((recharge) => {
      const totalTimeInMiliSeconds =
        new Date(recharge.endDate).getTime() -
        new Date(recharge.startDate).getTime();

      const totalTimeInHours = totalTimeInMiliSeconds / 1000 / 60 / 60;

      recharge.totalTime = `${totalTimeInHours.toFixed(2)} hours`;
    });

    return recharges;
  }

  private isValidDate(endDate: string | Date) {
    const isValidDate = new Date(endDate) > new Date();

    if (!isValidDate) {
      throw new Error(ErrorMessages.INVALID_DATE);
    }
  }
}
