import { Types } from "mongoose";
import { User } from "../model/user.type";

export class ResponseUserDTO {
  public _id: string | Types.ObjectId;
  public name: string;
  public email: string;
  public createdAt?: Date | string;
  public updatedAt?: Date | string;
  public deletedAt?: Date | string;

  constructor(public user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }
}
