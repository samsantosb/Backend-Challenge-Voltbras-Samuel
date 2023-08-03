import { InferSchemaType, Model, Schema, Types, model } from "mongoose";

const { ObjectId } = Schema.Types;

const StationHistorySchema = new Schema(
  {
    station: { type: ObjectId, ref: "Station", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    rechargeTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    deletedAt: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

type stationHistorySchema = InferSchemaType<typeof StationHistorySchema>;

export type mongooseStationHistoryModel = Model<stationHistorySchema>;

export type mongooseStationHistorySchema = stationHistorySchema & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const StationHistoryModel: mongooseStationHistoryModel = model(
  "StationHistory",
  StationHistorySchema
);
