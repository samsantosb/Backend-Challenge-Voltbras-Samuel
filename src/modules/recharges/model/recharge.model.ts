import { Types } from "mongoose";

export type Recharge = {
  _id: string | Types.ObjectId;
  stationId: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  inProgress: boolean;
  startDate: Date | string;
  endDate: Date | string;
};
