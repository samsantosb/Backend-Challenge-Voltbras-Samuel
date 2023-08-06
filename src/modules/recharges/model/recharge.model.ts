import { Types } from "mongoose";

export type Recharge = {
  _id: string | Types.ObjectId;
  stationName: string;
  userEmail: string;
  inProgress: boolean;
  startDate: Date | string;
  endDate: Date | string;
};
