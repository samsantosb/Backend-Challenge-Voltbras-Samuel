import { Types } from "mongoose";

export type Station = {
  _id: string | Types.ObjectId;
  planetName: string;
  recharges: string[] | Types.ObjectId[];
  reservations: string[] | Types.ObjectId[];
  stationHistories: string[] | Types.ObjectId[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
};
