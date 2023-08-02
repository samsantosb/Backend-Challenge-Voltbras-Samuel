import { Schema, model, Model, InferSchemaType } from "mongoose";

const { ObjectId } = Schema.Types;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    recharges: [{ type: ObjectId, ref: "Recharge" }],
    reservations: [{ type: ObjectId, ref: "Reservation" }],
    stationHistories: [{ type: ObjectId, ref: "StationHistory" }],
    deletedAt: Date,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type User = InferSchemaType<typeof UserSchema>;

export const UserModel = model("User", UserSchema);

export type mongooseUserModel = typeof UserModel & ITimestamps;
