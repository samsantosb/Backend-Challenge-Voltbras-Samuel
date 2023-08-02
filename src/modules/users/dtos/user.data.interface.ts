import { Types } from "mongoose";

export interface IUserData {
  name: string;
  email: string;
  password: string;
  recharges: Array<string | Types.ObjectId>;
  reservations: Array<string | Types.ObjectId>;
  stationHistories: Array<string | Types.ObjectId>;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
