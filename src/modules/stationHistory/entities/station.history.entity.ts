import { Types } from "mongoose";

export class StationHistory {
  public _id: string | Types.ObjectId;
  public station: string | Types.ObjectId;
  public user: string | Types.ObjectId;
  public rechargeTime: Date | String;
  public duration: number;
  public createdAt?: Date | String;
  public updatedAt?: Date | String;
  public deletedAt?: Date | String;

  constructor(stationHistory: StationHistory) {
    this._id = stationHistory._id;
    this.station = stationHistory.station;
    this.user = stationHistory.user;
    this.rechargeTime = stationHistory.rechargeTime;
    this.duration = stationHistory.duration;
    this.createdAt = stationHistory.createdAt;
    this.updatedAt = stationHistory.updatedAt;
    this.deletedAt = stationHistory.deletedAt;
  }
}
