import { Types } from "mongoose";

export class Recharge {
  public _id: string | Types.ObjectId;
  public station: string | Types.ObjectId;
  public user: string | Types.ObjectId;
  public inProgress: boolean;
  public startDate: Date | string;
  public endDate: Date | string;
  public createdAt?: Date | string;
  public updatedAt?: Date | string;
  public deletedAt?: Date | string;

  constructor(recharge: Recharge) {
    this._id = recharge._id;
    this.station = recharge.station;
    this.user = recharge.user;
    this.inProgress = recharge.inProgress;
    this.startDate = recharge.startDate;
    this.endDate = recharge.endDate;
    this.createdAt = recharge.createdAt;
    this.updatedAt = recharge.updatedAt;
    this.deletedAt = recharge.deletedAt;
  }
}
