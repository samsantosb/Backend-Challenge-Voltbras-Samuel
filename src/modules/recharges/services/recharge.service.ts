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

  async getAll() {
    const recharges = await this.rechargeRepository.getAll();

    if (!recharges) {
      throw new Error(ErrorMessages.NOT_FOUND("Recharges"));
    }

    recharges.forEach((recharge) => {
      recharge.endDate = String(recharge.endDate);
      recharge.startDate = String(recharge.startDate);
    });

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

    for (const recharge of recharges) {
      const totalTimeInMiliSeconds =
        new Date(recharge.endDate).getTime() -
        new Date(recharge.startDate).getTime();

      const totalTimeInHours = totalTimeInMiliSeconds / 1000 / 60 / 60;
      recharge.totalTime = `${totalTimeInHours.toFixed(2)} hours`;
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
    const userExist = await this.userService.getByEmail(recharge.userEmail);
    const stationExist = await this.stationService.getByName(
      recharge.stationName
    );

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

    const rechargeStartDate = new Date(recharge.startDate);
    const rechargeEndDate = new Date(recharge.endDate);

    this.isStationReservedByOtherUser(
      recharge.userEmail,
      reservations,
      rechargeStartDate,
      rechargeEndDate
    );

    const newRecharge = await this.rechargeRepository.create(recharge);

    if (!newRecharge) {
      throw new Error(ErrorMessages.CANNOT_CREATE("Recharge"));
    }

    return newRecharge;
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
}
