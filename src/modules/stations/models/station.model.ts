import { Schema, model, Model, InferSchemaType } from "mongoose";

const { ObjectId } = Schema.Types;

const StationSchema = new Schema(
  {
    planetName: String,
    recharges: [{ type: ObjectId, ref: "Recharge" }],
    reservations: [{ type: ObjectId, ref: "Reservation" }],
    histories: [{ type: ObjectId, ref: "StationHistory" }],
    deletedAt: Date,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export type Station = InferSchemaType<typeof StationSchema>;

export const StationModel: Model<Station> = model("Station", StationSchema);
