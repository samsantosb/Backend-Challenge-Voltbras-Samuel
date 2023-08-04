import { Types } from "mongoose";

export class User {
  public _id: string | Types.ObjectId;
  public name: string;
  public email: string;
  public password: string;
  public recharges: string[] | Types.ObjectId[];
  public reservations: string[] | Types.ObjectId[];
  public stationHistories: string[] | Types.ObjectId[];
  public createdAt?: Date | string;
  public updatedAt?: Date | string;
  public deletedAt?: Date | string;
  constructor(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.recharges = user.recharges;
    this.reservations = user.reservations;
    this.stationHistories = user.stationHistories;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }
}
