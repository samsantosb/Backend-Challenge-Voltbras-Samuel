import { InferSchemaType, Model, Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const ReservationSchema = new Schema(
  {
    station: { type: ObjectId, ref: "Station" },
    user: { type: ObjectId, ref: "User" },
    startTime: Date,
    endTime: Date,
    inProgress: Boolean,
    deletedAt: Date,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export type Reservation = InferSchemaType<typeof ReservationSchema>;

export const ReservationModel: Model<Reservation> = model(
  "Reservation",
  ReservationSchema
);
