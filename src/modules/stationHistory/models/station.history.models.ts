import { InferSchemaType, Model, Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const StationHistorySchema = new Schema({
  station: { type: ObjectId, ref: "Station" },
  user: { type: ObjectId, ref: "User" },
  rechargeTime: Date,
  duration: Number,
});

export type StationHistory = InferSchemaType<typeof StationHistorySchema>;

export const StationHistoryModel: Model<StationHistory> = model(
  "StationHistory",
  StationHistorySchema
);
