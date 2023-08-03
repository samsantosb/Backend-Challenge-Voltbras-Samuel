import { Recharge } from "../entities/recharge.entity";

export class ResponseRechargeDTO {
  public station: string;
  public user: string;
  public inProgress: boolean;
  public endDate: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(recharge: Recharge) {
    this.station = recharge.station;
    this.user = recharge.user;
    this.inProgress = recharge.inProgress;
    this.endDate = recharge.endDate;
    this.createdAt = recharge.createdAt;
    this.updatedAt = recharge.updatedAt;
    this.deletedAt = recharge.deletedAt;
  }
}
