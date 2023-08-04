import { Types } from "mongoose";

export type Reservation = {
  _id: string | Types.ObjectId;
  station: string | Types.ObjectId;
  user: string | Types.ObjectId;
  startTime: Date | string;
  endTime: Date | string;
  inProgress: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
};
