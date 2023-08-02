import { Schema, model, Model, InferSchemaType, Types } from "mongoose";

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

type userSchema = InferSchemaType<typeof UserSchema>;

export type mongooseUserModel = Model<InferSchemaType<typeof UserSchema>>;

export type mongooseUserSchema = userSchema & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const UserModel = model("User", UserSchema);
