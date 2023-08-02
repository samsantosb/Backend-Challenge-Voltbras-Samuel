import { Types } from "mongoose";
import { User } from "../../entities/user.entity";

export class ResponseUserDTO {
  public name: string;
  public email: string;
  public recharges: Array<string | Types.ObjectId>;
  public reservations: Array<string | Types.ObjectId>;
  public stationHistories: Array<string | Types.ObjectId>;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

  constructor(public user: User) {
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
