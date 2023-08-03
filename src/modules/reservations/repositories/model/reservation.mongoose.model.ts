import { InferSchemaType, Model, Schema, Types, model } from "mongoose";

const { ObjectId } = Schema.Types;

const ReservationSchema = new Schema(
  {
    station: { type: ObjectId, ref: "Station", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    inProgress: { type: Boolean, required: true },
    deletedAt: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

type ReservationSchemaType = InferSchemaType<typeof ReservationSchema>;

export type mongooseReservationModel = Model<ReservationSchemaType>;

export type mongooseReservationSchema = ReservationSchemaType & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const ReservationModel: mongooseReservationModel = model(
  "Reservation",
  ReservationSchema
);
