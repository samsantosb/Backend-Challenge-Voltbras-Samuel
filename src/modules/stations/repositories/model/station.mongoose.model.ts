import { Schema, model, Model, InferSchemaType, Types } from "mongoose";

const { ObjectId } = Schema.Types;

const StationSchema = new Schema(
  {
    planetName: { type: String, required: true, uinique: true },
    recharges: [{ type: ObjectId, ref: "Recharge" }],
    reservations: [{ type: ObjectId, ref: "Reservation" }],
    stationHistories: [{ type: ObjectId, ref: "StationHistory" }],
    deletedAt: Date,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

type stationSchema = InferSchemaType<typeof StationSchema>;

export type mongooseStationModel = Model<stationSchema>;

export type mongooseStationSchema = stationSchema & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const StationModel = model("Station", StationSchema);
