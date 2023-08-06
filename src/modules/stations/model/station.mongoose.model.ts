import { Schema, model, Model, InferSchemaType, Types } from "mongoose";

const StationSchema = new Schema(
  {
    planetName: { type: String, required: true, uinique: true },
    name: { type: String, required: true, uinique: true },
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
