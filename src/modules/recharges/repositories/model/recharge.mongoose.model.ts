import { InferSchemaType, Model, Schema, Types, model } from "mongoose";

const { ObjectId } = Schema.Types;

const RechargeSchema = new Schema(
  {
    station: { type: ObjectId, ref: "Station", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    inProgress: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    deletedAt: Date,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

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
