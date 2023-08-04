import { Types } from "mongoose";
import { User } from "../entities/user.entity";

export class ResponseUserDTO {
  public _id: string | Types.ObjectId;
  public name: string;
  public email: string;
  public recharges: Array<string> | Array<Types.ObjectId>;
  public reservations: Array<string> | Array<Types.ObjectId>;
  public stationHistories: Array<string> | Array<Types.ObjectId>;
  public createdAt?: Date | string;
  public updatedAt?: Date | string;
  public deletedAt?: Date | string;

  constructor(public user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.recharges = user.recharges;
    this.reservations = user.reservations;
    this.stationHistories = user.stationHistories;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }
}
