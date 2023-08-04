import { Types } from "mongoose";

export type User = {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  password: string;
  recharges: string[] | Types.ObjectId[];
  reservations: string[] | Types.ObjectId[];
  stationHistories: string[] | Types.ObjectId[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
};
