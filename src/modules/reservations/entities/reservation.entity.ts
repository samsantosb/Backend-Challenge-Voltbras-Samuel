import { Types } from "mongoose";

export class Reservation {
  public _id: string | Types.ObjectId;
  public station: string | Types.ObjectId;
  public user: string | Types.ObjectId;
  public startTime: Date | String;
  public endTime: Date | String;
  public inProgress: boolean;
  public createdAt?: Date | String;
  public updatedAt?: Date | String;
  public deletedAt?: Date | String;

  constructor(reservation: Reservation) {
    this._id = reservation._id;
    this.station = reservation.station;
    this.user = reservation.user;
    this.startTime = reservation.startTime;
    this.endTime = reservation.endTime;
    this.inProgress = reservation.inProgress;
    this.createdAt = reservation.createdAt;
    this.updatedAt = reservation.updatedAt;
    this.deletedAt = reservation.deletedAt;
  }
}
