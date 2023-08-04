import { Types } from "mongoose";

export type Recharge = {
  _id: string | Types.ObjectId;
  station: string | Types.ObjectId;
  user: string | Types.ObjectId;
  inProgress: boolean;
  startDate: Date | string;
  endDate: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
};
