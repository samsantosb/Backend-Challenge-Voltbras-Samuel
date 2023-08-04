import { Types } from "mongoose";

export type StationHistory = {
  _id: string | Types.ObjectId;
  station: string | Types.ObjectId;
  user: string | Types.ObjectId;
  rechargeTime: Date | string;
  duration: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
};
