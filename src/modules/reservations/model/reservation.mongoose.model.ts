import { InferSchemaType, Model, Schema, Types, model } from "mongoose";

const ReservationSchema = new Schema({
  stationName: { type: String, required: true },
  userEmail: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

type ReservationSchemaType = InferSchemaType<typeof ReservationSchema>;

export type mongooseReservationModel = Model<ReservationSchemaType>;

export type mongooseRechargeSchema = ReservationSchemaType & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const ReservationModel: mongooseReservationModel = model(
  "Reservation",
  ReservationSchema
);
