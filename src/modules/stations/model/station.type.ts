import { Types } from "mongoose";

export type Station = {
  _id: string | Types.ObjectId;
  stationName: string;
  planetName: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
};
