import { Types } from "mongoose";

export type Reservation = {
  _id: string | Types.ObjectId;
  stationName: string;
  userEmail: string;
  startDate: Date | string;
  endDate: Date | string;
};
