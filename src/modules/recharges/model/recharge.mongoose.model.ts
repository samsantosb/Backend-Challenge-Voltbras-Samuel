import { InferSchemaType, Model, Schema, Types, model } from "mongoose";

const RechargeSchema = new Schema({
  stationName: { type: String, required: true },
  userEmail: { type: String, required: true },
  inProgress: { type: Boolean, default: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

type RechargeSchemaType = InferSchemaType<typeof RechargeSchema>;

export type mongooseRechargeModel = Model<RechargeSchemaType>;

export type mongooseRechargeSchema = RechargeSchemaType & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const RechargeModel: mongooseRechargeModel = model(
  "Recharge",
  RechargeSchema
);
